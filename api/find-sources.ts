/* POST /api/find-sources — the one live endpoint in the product.
 *
 * A reporter's draft or story idea goes to Claude Sonnet 5 first, with up to
 * five web searches. If that run fails or produces no grounded suggestions,
 * the endpoint makes one backup attempt with OpenAI web search. Both providers
 * return the same small contract: proposed suggestions plus the URLs their
 * own search actually returned. The deterministic gate in lib/grounding.ts
 * deletes every suggestion whose URL is absent from that same run.
 *
 * The response is NDJSON: progress lines while Anthropic searches, then one
 * done or error line. Input validation and quota errors are ordinary JSON with
 * real status codes. The site has no database. Live text leaves the site for
 * the active model provider, so the page warns against confidential material.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clientIp, createRateLimiter, QUOTA_BODY } from "./_shared.js";
import {
  collectSearchUrls,
  explainDrops,
} from "../lib/grounding.js";
import {
  buildUserContent,
  MAX_SEARCHES,
  MAX_TOKENS,
  MODEL,
  SYSTEM_PROMPT,
  THINKING,
} from "../lib/prompt.js";
import { parseSuggestionsArray } from "../lib/parse-answer.js";
import { estimateApiCostUsd } from "../lib/cost.js";
import {
  OPENAI_FALLBACK_MODEL,
  OpenAiFallbackError,
  runOpenAiFallback,
} from "../lib/openai-fallback.js";
import {
  runWithProviderFallback,
  SAFE_PROVIDER_ERROR,
  type ProviderRun,
} from "../lib/provider-fallback.js";
import {
  SseParser,
  StreamAccumulator,
  type ProgressEvent,
} from "../lib/sse-accumulator.js";

const MAX_INPUT_CHARS = 8000;
// Vercel allows 180 seconds. Reserve enough time for the backup to complete
// when the primary stalls instead of letting one provider consume the window.
const ANTHROPIC_TIMEOUT_MS = 105_000;
const OPENAI_TIMEOUT_MS = 65_000;

const limiter = createRateLimiter({
  // A guardrail for this two-recipient demo, not a distributed hard cap.
  perIpLimit: 3,
  perIpWindowMs: 60 * 60 * 1000,
  globalDailyLimit: 20,
});

interface AnthropicPrimaryRun extends ProviderRun {
  provider: "anthropic";
  model: string;
  searchesRun: number;
  usage: {
    inputTokens: number | null;
    outputTokens: number | null;
  };
}

class AnthropicPrimaryError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AnthropicPrimaryError";
    this.status = status;
  }
}

function inputError(res: VercelResponse, message: string): void {
  res.status(400).json({ error: message });
}

async function runAnthropicPrimary(options: {
  apiKey: string;
  text: string;
  isIdea: boolean;
  signal: AbortSignal;
  onProgress: (progress: ProgressEvent) => void;
}): Promise<AnthropicPrimaryRun> {
  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = (): void => controller.abort(options.signal.reason);
  if (options.signal.aborted) abortFromCaller();
  else options.signal.addEventListener("abort", abortFromCaller, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, ANTHROPIC_TIMEOUT_MS);

  try {
    let response: Response;
    try {
      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": options.apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          thinking: THINKING,
          stream: true,
          system: SYSTEM_PROMPT,
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: MAX_SEARCHES,
            },
          ],
          messages: [
            {
              role: "user",
              content: buildUserContent(options.text, options.isIdea),
            },
          ],
        }),
      });
    } catch (cause) {
      throw new AnthropicPrimaryError(
        timedOut ? "primary timed out" : "primary request failed",
        undefined,
        { cause },
      );
    }

    if (!response.ok || !response.body) {
      throw new AnthropicPrimaryError(
        `primary returned HTTP ${response.status}`,
        response.status,
      );
    }

    const parser = new SseParser();
    const acc = new StreamAccumulator();
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const event of parser.feed(decoder.decode(value, { stream: true }))) {
          if (event.type === "error") {
            throw new AnthropicPrimaryError("primary stream returned an error");
          }
          const progress = acc.feed(event);
          if (progress) options.onProgress(progress);
        }
      }
    } catch (cause) {
      if (cause instanceof AnthropicPrimaryError) throw cause;
      throw new AnthropicPrimaryError(
        timedOut ? "primary timed out" : "primary stream failed",
        undefined,
        { cause },
      );
    }

    const content = acc.content();
    const searchUrls = collectSearchUrls(content);
    if (searchUrls.size === 0) {
      throw new AnthropicPrimaryError("primary returned no searched URLs");
    }
    const suggestions = parseSuggestionsArray(content);
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      throw new AnthropicPrimaryError("primary returned no usable suggestions");
    }

    return {
      provider: "anthropic",
      model: MODEL,
      suggestions,
      searchUrls,
      searchesRun: acc.searchesRun,
      usage: {
        inputTokens: acc.usage.input_tokens ?? null,
        outputTokens: acc.usage.output_tokens ?? null,
      },
    };
  } finally {
    clearTimeout(timeout);
    options.signal.removeEventListener("abort", abortFromCaller);
  }
}

function logAnthropicFailure(error: unknown): void {
  if (error instanceof AnthropicPrimaryError) {
    console.error(
      `anthropic primary failed${error.status ? `: HTTP ${error.status}` : ""}`,
    );
  } else {
    console.error("anthropic primary failed");
  }
}

function logOpenAiFailure(error: unknown): void {
  if (error instanceof OpenAiFallbackError) {
    console.error(
      `openai fallback failed: ${error.kind}${error.status ? ` HTTP ${error.status}` : ""}`,
    );
  } else {
    console.error("openai fallback failed");
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }

  const body: unknown = req.body;
  if (typeof body !== "object" || body === null) {
    inputError(res, "expected a JSON body");
    return;
  }
  const { text, mode } = body as { text?: unknown; mode?: unknown };
  if (typeof text !== "string" || text.trim().length === 0) {
    inputError(res, "expected non-empty text");
    return;
  }
  if (text.length > MAX_INPUT_CHARS) {
    inputError(res, `text is limited to ${MAX_INPUT_CHARS} characters`);
    return;
  }
  const isIdea = mode === "idea";

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!anthropicKey && !openAiKey) {
    res.status(503).json({ error: "AI provider keys are not configured" });
    return;
  }

  try {
    if (limiter.overQuota(clientIp(req))) {
      res.status(429).json(QUOTA_BODY);
      return;
    }
  } catch {
    // Fail closed: a broken quota path must not start a paid request.
    res.status(429).json(QUOTA_BODY);
    return;
  }

  res.status(200);
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  const send = (line: Record<string, unknown>): void => {
    if (!res.writableEnded) res.write(JSON.stringify(line) + "\n");
  };

  const requestController = new AbortController();
  const abortRequest = (): void => requestController.abort();
  req.once("aborted", abortRequest);
  req.once("error", abortRequest);
  res.once("close", () => {
    if (!res.writableEnded) abortRequest();
  });

  const started = Date.now();
  const result = await runWithProviderFallback({
    runAnthropic: async () => {
      if (!anthropicKey) throw new AnthropicPrimaryError("primary key missing");
      try {
        return await runAnthropicPrimary({
          apiKey: anthropicKey,
          text,
          isIdea,
          signal: requestController.signal,
          onProgress: (progress) => send({ t: "progress", ...progress }),
        });
      } catch (error) {
        logAnthropicFailure(error);
        throw error;
      }
    },
    runOpenAI: async () => {
      if (!openAiKey) throw new OpenAiFallbackError("upstream", "fallback key missing");
      send({
        t: "progress",
        kind: "fallback_started",
        model: OPENAI_FALLBACK_MODEL,
      });
      try {
        return await runOpenAiFallback({
          apiKey: openAiKey,
          text,
          isIdea,
          signal: requestController.signal,
          timeoutMs: OPENAI_TIMEOUT_MS,
        });
      } catch (error) {
        logOpenAiFailure(error);
        throw error;
      }
    },
  });

  if (!result.ok) {
    send({ t: "error", error: SAFE_PROVIDER_ERROR });
    res.end();
    return;
  }

  const { kept, droppedCount } = result.grounded;
  if (droppedCount > 0) {
    // Production logs retain counts and reason labels, never model-authored
    // suggestion text, search queries or URLs.
    const reasonCounts: Record<string, number> = {};
    for (const drop of explainDrops(result.run.suggestions, result.run.searchUrls)) {
      reasonCounts[drop.reason] = (reasonCounts[drop.reason] ?? 0) + 1;
    }
    const proposedCount = Array.isArray(result.run.suggestions)
      ? result.run.suggestions.length
      : 0;
    console.error(
      `${result.provider} gate dropped ${droppedCount}/${proposedCount}:`,
      JSON.stringify(reasonCounts),
    );
  }

  const estimatedCostUsd = estimateApiCostUsd({
    model: result.run.model,
    inputTokens: result.run.usage.inputTokens,
    outputTokens: result.run.usage.outputTokens,
    webSearches: result.run.searchesRun,
  });

  send({
    t: "done",
    mode: isIdea ? "idea" : "draft",
    suggestions: kept,
    dropped_count: droppedCount,
    searches_run: result.run.searchesRun,
    model: result.run.model,
    provider: result.provider,
    estimated_cost_usd: estimatedCostUsd,
    ms: Date.now() - started,
  });
  res.end();
}
