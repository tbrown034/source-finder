/* POST /api/find-sources — the one model call in the product.
 *
 * A reporter's draft or story idea goes to claude-sonnet-4-6 with the
 * official web search tool (max 8 searches). The model proposes sources
 * across five blindspot categories; the grounding gate in lib/grounding.ts
 * then drops, server-side, every suggestion whose URL did not appear in an
 * actual search result. What survives is returned with an honest
 * dropped_count. No from-memory citations reach the reader.
 *
 * The response is a stream: NDJSON progress lines while the model works
 * (each search as it starts and returns), then one "done" line with the
 * gated result. Validation and quota errors are plain JSON with real
 * status codes — the stream begins only once the model call is committed.
 *
 * The pasted text is sent to Anthropic; the model's search queries go to
 * the web. Nothing is stored here. */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clientIp, createRateLimiter, QUOTA_BODY } from "./_shared.js";
import {
  applyGroundingGate,
  collectSearchUrls,
  explainDrops,
} from "../lib/grounding.js";
import {
  buildUserContent,
  MAX_SEARCHES,
  MAX_TOKENS,
  MODEL,
  SYSTEM_PROMPT,
} from "../lib/prompt.js";
import { parseSuggestionsArray } from "../lib/parse-answer.js";
import { SseParser, StreamAccumulator } from "../lib/sse-accumulator.js";

const MAX_INPUT_CHARS = 8000;
// Live runs with 6-8 searches take 60-90s; the function's maxDuration is
// 180s in vercel.json, so the model gets 150s before we abort.
const TIMEOUT_MS = 150_000;

const limiter = createRateLimiter({
  perIpLimit: 3,
  perIpWindowMs: 60 * 60 * 1000,
  globalDailyLimit: 100,
});

function inputError(res: VercelResponse, message: string): void {
  res.status(400).json({ error: message });
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

  // Key check before the limiter: a misconfigured deployment must not
  // drain the daily budget on requests that never reach the model.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: "ANTHROPIC_API_KEY is not configured on this deployment",
    });
    return;
  }

  try {
    if (limiter.overQuota(clientIp(req))) {
      res.status(429).json(QUOTA_BODY);
      return;
    }
  } catch {
    // Fail closed: if the counter path breaks, no model call happens.
    res.status(429).json(QUOTA_BODY);
    return;
  }

  const started = Date.now();
  let response: Response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
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
            content: buildUserContent(text, isIdea),
          },
        ],
      }),
    });
  } catch {
    res.status(502).json({ error: "model call failed" });
    return;
  }

  if (!response.ok || !response.body) {
    // Log the upstream status for the operator; tell the reader the truth
    // about whether retrying can help.
    console.error(`anthropic upstream error: HTTP ${response.status}`);
    if (response.status === 429 || response.status === 529) {
      res.status(503).json({
        error: "the model provider is busy — try again in a minute",
      });
    } else {
      res.status(502).json({ error: "model call failed" });
    }
    return;
  }

  // From here on the response is a committed NDJSON stream.
  res.status(200);
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  const send = (line: Record<string, unknown>): void => {
    res.write(JSON.stringify(line) + "\n");
  };

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
          console.error("anthropic stream error event", event.error);
          send({ t: "error", error: "model call failed" });
          res.end();
          return;
        }
        const progress = acc.feed(event);
        if (progress) send({ t: "progress", ...progress });
      }
    }
  } catch {
    // Timeout or network drop mid-stream: nothing is computed from a
    // partial answer.
    send({ t: "error", error: "model call failed" });
    res.end();
    return;
  }

  const content = acc.content();
  const searchUrls = collectSearchUrls(content);
  if (searchUrls.size === 0) {
    // No usable search results means nothing can be grounded — that is a
    // failed run to retry, not an empty result to present. The gate is
    // not weakened; there is simply nothing for it to pass.
    console.error("web search returned no usable results; nothing to ground against");
    send({
      t: "error",
      error:
        "web search returned no usable results this run, so nothing could be grounded — try again in a moment",
    });
    res.end();
    return;
  }
  const suggestions = parseSuggestionsArray(content);
  if (!Array.isArray(suggestions)) {
    send({
      t: "error",
      error:
        "the model did not return a usable source list for this input — that usually means the text is too thin for sourcing",
    });
    res.end();
    return;
  }

  const { kept, droppedCount } = applyGroundingGate(suggestions, searchUrls);
  if (droppedCount > 0) {
    // Operator-facing diagnosis: which check failed, per drop. Suggestion
    // text is model output about public sources — not reader PII.
    console.error(
      `gate dropped ${droppedCount}/${suggestions.length}:`,
      JSON.stringify(explainDrops(suggestions, searchUrls)),
    );
  }

  send({
    t: "done",
    mode: isIdea ? "idea" : "draft",
    suggestions: kept,
    dropped_count: droppedCount,
    // The count the wire narrated — never a second, disagreeing number.
    searches_run: acc.searchesRun,
    usage: {
      input_tokens: acc.usage.input_tokens ?? null,
      output_tokens: acc.usage.output_tokens ?? null,
    },
    model: MODEL,
    ms: Date.now() - started,
  });
  res.end();
}
