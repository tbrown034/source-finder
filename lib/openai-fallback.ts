/* OpenAI fallback provider for Source Finder.
 *
 * This module is intentionally isolated from the HTTP handler: Anthropic stays
 * primary, while a caller may invoke this provider after a retryable Anthropic
 * failure. It uses the Responses API directly (no SDK), asks for the complete
 * web-search source list, and returns both parsed suggestions and normalized
 * URLs for the existing deterministic grounding gate.
 *
 * Official API shape:
 * https://developers.openai.com/api/docs/guides/tools-web-search#sources
 */

import { normalizeUrl } from "./grounding.js";
import { parseSuggestionsArray } from "./parse-answer.js";
import { buildUserContent, SYSTEM_PROMPT } from "./prompt.js";

export const OPENAI_FALLBACK_MODEL = "gpt-5.6-terra";
export const OPENAI_FALLBACK_MAX_TOOL_CALLS = 5;
export const OPENAI_FALLBACK_TIMEOUT_MS = 150_000;

export interface CanonicalSearchResult {
  url: string;
  title: string;
}

export interface OpenAiFallbackUsage {
  inputTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
}

export interface OpenAiFallbackResult {
  provider: "openai";
  model: string;
  suggestions: unknown[];
  /* Complete URL/title records supplied by web_search_call.action.sources,
   * with cited annotations used only as a defensive fallback. */
  searchResults: CanonicalSearchResult[];
  /* Ready to pass directly to applyGroundingGate(suggestions, searchUrls). */
  searchUrls: Set<string>;
  searchesRun: number;
  usage: OpenAiFallbackUsage;
}

export type OpenAiFallbackErrorKind =
  | "transport"
  | "timeout"
  | "upstream"
  | "invalid_response";

export class OpenAiFallbackError extends Error {
  readonly kind: OpenAiFallbackErrorKind;
  readonly status?: number;

  constructor(
    kind: OpenAiFallbackErrorKind,
    message: string,
    options: { status?: number; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "OpenAiFallbackError";
    this.kind = kind;
    this.status = options.status;
  }
}

export type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export interface RunOpenAiFallbackOptions {
  apiKey: string;
  text: string;
  isIdea: boolean;
  signal?: AbortSignal;
  fetchImpl?: FetchLike;
  model?: string;
  timeoutMs?: number;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function addSearchResult(
  results: Map<string, CanonicalSearchResult>,
  raw: unknown,
): void {
  if (!isObject(raw)) return;
  const url = asNonEmptyString(raw.url);
  if (!url) return;
  const normalized = normalizeUrl(url);
  if (!normalized) return;
  const title = asNonEmptyString(raw.title) ?? url;
  const previous = results.get(normalized);
  /* Prefer the complete source-list record. If an annotation was seen first,
   * replace its URL-as-title fallback when a real title later arrives. */
  if (!previous || (previous.title === previous.url && title !== url)) {
    results.set(normalized, { url, title });
  }
}

function collectOutputText(payload: Record<string, unknown>): string[] {
  const text: string[] = [];
  const output = payload.output;
  if (!Array.isArray(output)) return text;
  for (const item of output) {
    if (!isObject(item) || item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }
    for (const part of item.content) {
      if (!isObject(part) || part.type !== "output_text") continue;
      const value = asNonEmptyString(part.text);
      if (value) text.push(value);
    }
  }
  return text;
}

function collectSearchEvidence(payload: Record<string, unknown>): {
  searchResults: CanonicalSearchResult[];
  searchesRun: number;
} {
  const results = new Map<string, CanonicalSearchResult>();
  let searchesRun = 0;
  const output = payload.output;
  if (!Array.isArray(output)) return { searchResults: [], searchesRun };

  /* Complete consulted-source list from each web search call. */
  for (const item of output) {
    if (!isObject(item) || item.type !== "web_search_call") continue;
    searchesRun++;
    const action = isObject(item.action) ? item.action : null;
    if (action && Array.isArray(action.sources)) {
      for (const source of action.sources) addSearchResult(results, source);
    }
  }

  /* Official Responses annotations identify URLs actually cited by the
   * assistant. They are a safe fallback if an otherwise valid response omits
   * the requested complete source list. */
  for (const item of output) {
    if (!isObject(item) || item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }
    for (const part of item.content) {
      if (!isObject(part) || !Array.isArray(part.annotations)) continue;
      for (const annotation of part.annotations) {
        if (!isObject(annotation) || annotation.type !== "url_citation") continue;
        addSearchResult(results, annotation);
      }
    }
  }

  return { searchResults: [...results.values()], searchesRun };
}

function nullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function parseOpenAiFallbackResponse(
  payload: unknown,
  requestedModel = OPENAI_FALLBACK_MODEL,
): OpenAiFallbackResult {
  if (!isObject(payload) || payload.status !== "completed") {
    throw new OpenAiFallbackError(
      "invalid_response",
      "OpenAI did not return a completed response",
    );
  }

  const outputText = collectOutputText(payload);
  const suggestions = parseSuggestionsArray(
    outputText.map((text) => ({ type: "text", text })),
  );
  if (!Array.isArray(suggestions)) {
    throw new OpenAiFallbackError(
      "invalid_response",
      "OpenAI did not return a usable source list",
    );
  }

  const { searchResults, searchesRun } = collectSearchEvidence(payload);
  if (searchResults.length === 0) {
    throw new OpenAiFallbackError(
      "invalid_response",
      "OpenAI web search returned no usable source URLs",
    );
  }

  const usage = isObject(payload.usage) ? payload.usage : {};
  return {
    provider: "openai",
    model: asNonEmptyString(payload.model) ?? requestedModel,
    suggestions,
    searchResults,
    searchUrls: new Set(
      searchResults.flatMap((result) => {
        const normalized = normalizeUrl(result.url);
        return normalized ? [normalized] : [];
      }),
    ),
    searchesRun,
    usage: {
      inputTokens: nullableNumber(usage.input_tokens),
      outputTokens: nullableNumber(usage.output_tokens),
      totalTokens: nullableNumber(usage.total_tokens),
    },
  };
}

export async function runOpenAiFallback(
  options: RunOpenAiFallbackOptions,
): Promise<OpenAiFallbackResult> {
  if (!options.apiKey.trim()) {
    throw new OpenAiFallbackError("upstream", "OPENAI_API_KEY is not configured");
  }

  const model = options.model ?? OPENAI_FALLBACK_MODEL;
  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = (): void => controller.abort(options.signal?.reason);
  if (options.signal?.aborted) abortFromCaller();
  else options.signal?.addEventListener("abort", abortFromCaller, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.timeoutMs ?? OPENAI_FALLBACK_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetchImpl("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        authorization: `Bearer ${options.apiKey}`,
        "content-type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        instructions: SYSTEM_PROMPT,
        input: buildUserContent(options.text, options.isIdea),
        tools: [{ type: "web_search", search_context_size: "medium" }],
        tool_choice: "required",
        include: ["web_search_call.action.sources"],
        max_tool_calls: OPENAI_FALLBACK_MAX_TOOL_CALLS,
        max_output_tokens: 5000,
        reasoning: { effort: "low" },
        store: false,
      }),
    });
  } catch (cause) {
    throw new OpenAiFallbackError(
      timedOut ? "timeout" : "transport",
      timedOut ? "OpenAI fallback timed out" : "OpenAI fallback request failed",
      { cause },
    );
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", abortFromCaller);
  }

  if (!response.ok) {
    throw new OpenAiFallbackError(
      "upstream",
      `OpenAI fallback returned HTTP ${response.status}`,
      { status: response.status },
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new OpenAiFallbackError(
      "invalid_response",
      "OpenAI fallback returned invalid JSON",
      { cause },
    );
  }
  return parseOpenAiFallbackResponse(payload, model);
}
