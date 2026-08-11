/* The grounding gate — the contract that makes this tool honest.
 *
 * Every suggestion the model returns must cite a URL that appeared in an
 * actual web search result from the same API response. A suggestion the
 * model "remembers" — however plausible — is dropped here, server-side,
 * before the reader ever sees it. The gate is deliberately conservative:
 * a same-domain URL the search never returned does not pass, and a
 * false rejection only costs one suggestion, while a false acceptance
 * would put an unverified citation in front of a reporter.
 *
 * Pure functions, no I/O — unit-tested in grounding.test.ts and re-run
 * in the browser over the committed sample fixture. */

import { isKnownCategory } from "./categories";

export interface Suggestion {
  category: string;
  who_or_what: string;
  why_needed: string;
  url: string;
  source_title: string;
}

export interface GateResult {
  kept: Suggestion[];
  droppedCount: number;
}

/* Normalize a URL for comparison: lowercase scheme and host, strip
 * fragments, strip a single trailing slash on the path. Query strings are
 * kept — a different query is a different page, and guessing otherwise
 * would let the model launder an invented deep link through a real domain. */
export function normalizeUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  const path = url.pathname.length > 1 && url.pathname.endsWith("/")
    ? url.pathname.slice(0, -1)
    : url.pathname;
  // http vs https is treated as the same page: search results and model
  // output sometimes disagree on scheme for the same URL.
  return `${url.host.toLowerCase()}${path}${url.search}`;
}

/* Collect every URL the web search actually returned. The response shape is
 * the Messages API content array: web_search_tool_result blocks whose
 * content is a list of web_search_result items ({url, title, ...}).
 * An errored search returns an object instead of a list — contributes
 * nothing, never throws. */
export function collectSearchUrls(content: unknown): Set<string> {
  const urls = new Set<string>();
  if (!Array.isArray(content)) return urls;
  for (const block of content) {
    if (
      typeof block !== "object" || block === null ||
      (block as { type?: unknown }).type !== "web_search_tool_result"
    ) continue;
    const inner = (block as { content?: unknown }).content;
    if (!Array.isArray(inner)) continue; // error object, not a result list
    for (const result of inner) {
      if (typeof result !== "object" || result === null) continue;
      const url = (result as { url?: unknown }).url;
      if (typeof url !== "string") continue;
      const normalized = normalizeUrl(url);
      if (normalized) urls.add(normalized);
    }
  }
  return urls;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/* Validate one suggestion's shape. Missing or empty fields drop it;
 * an unknown category drops it (the page would have nowhere honest
 * to put it). */
export function isWellFormed(s: unknown): s is Suggestion {
  if (typeof s !== "object" || s === null) return false;
  const o = s as Record<string, unknown>;
  return (
    isKnownCategory(o.category) &&
    isNonEmptyString(o.who_or_what) &&
    isNonEmptyString(o.why_needed) &&
    isNonEmptyString(o.url) &&
    isNonEmptyString(o.source_title)
  );
}

/* The gate itself. Given the model's parsed suggestions and the set of
 * URLs the search actually returned, keep only well-formed suggestions
 * whose URL is grounded. Empty search results mean nothing survives —
 * no from-memory citations, ever. */
export function applyGroundingGate(
  suggestions: unknown,
  searchUrls: Set<string>,
): GateResult {
  if (!Array.isArray(suggestions)) return { kept: [], droppedCount: 0 };
  const kept: Suggestion[] = [];
  let droppedCount = 0;
  for (const s of suggestions) {
    if (!isWellFormed(s)) {
      droppedCount++;
      continue;
    }
    const normalized = normalizeUrl(s.url);
    if (normalized !== null && searchUrls.has(normalized)) {
      kept.push(s);
    } else {
      droppedCount++;
    }
  }
  return { kept, droppedCount };
}
