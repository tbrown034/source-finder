/* POST /api/find-sources — the one model call in the product.
 *
 * A reporter's draft or story idea goes to claude-sonnet-4-6 with the
 * official web search tool (max 8 searches). The model proposes sources
 * across five blindspot categories; the grounding gate in lib/grounding.ts
 * then drops, server-side, every suggestion whose URL did not appear in an
 * actual search result. What survives is returned with an honest
 * dropped_count. No from-memory citations reach the reader.
 *
 * The pasted text is sent to Anthropic; the model's search queries go to
 * the web. Nothing is stored here. */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clientIp, createRateLimiter, QUOTA_BODY } from "./_shared.js";
import {
  applyGroundingGate,
  collectSearchUrls,
} from "../lib/grounding.js";
import {
  buildUserContent,
  MAX_SEARCHES,
  MAX_TOKENS,
  MODEL,
  SYSTEM_PROMPT,
} from "../lib/prompt.js";
import { parseSuggestionsArray } from "../lib/parse-answer.js";

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

  if (!response.ok) {
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

  let payload: {
    content?: unknown;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      server_tool_use?: { web_search_requests?: number };
    };
  };
  try {
    payload = await response.json();
  } catch {
    res.status(502).json({ error: "model returned an unreadable response" });
    return;
  }
  if (typeof payload !== "object" || payload === null) {
    res.status(502).json({ error: "model returned an unreadable response" });
    return;
  }

  const content = payload.content;
  const searchUrls = collectSearchUrls(content);
  const suggestions = parseSuggestionsArray(content);
  if (!Array.isArray(suggestions)) {
    res.status(502).json({
      error:
        "model returned unparseable output — nothing was computed from it",
    });
    return;
  }

  const { kept, droppedCount } = applyGroundingGate(suggestions, searchUrls);

  res.status(200).json({
    mode: isIdea ? "idea" : "draft",
    suggestions: kept,
    dropped_count: droppedCount,
    searches_run: payload.usage?.server_tool_use?.web_search_requests ?? null,
    usage: {
      input_tokens: payload.usage?.input_tokens ?? null,
      output_tokens: payload.usage?.output_tokens ?? null,
    },
    model: MODEL,
    ms: Date.now() - started,
  });
}
