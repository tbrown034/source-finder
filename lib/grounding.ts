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

import { isKnownCategory, normalizeCategory } from "./categories.js";

export interface Suggestion {
  category: string;
  who_or_what: string;
  why_needed: string;
  /* Why this particular source is credible or well-placed — optional. */
  why_good?: string;
  /* How to reach the source (media line, contact page, email) — optional,
   * and only kept when contact_url passes the grounding gate. Always
   * presented as unverified until the reporter confirms it. */
  contact?: string;
  contact_url?: string;
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
  // URLs carrying credentials never pass: search results don't contain
  // them, and a user:pass@host URL in an href is a spoofing primitive.
  if (url.username !== "" || url.password !== "") return null;
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
      // Pin the item type so a future block-shape change can't silently
      // widen what counts as "a search result".
      if ((result as { type?: unknown }).type !== "web_search_result") continue;
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
  for (const raw of suggestions) {
    // Deterministic label->id repair happens BEFORE validation; it never
    // invents a category, only maps the five official labels back.
    let s = raw;
    if (typeof raw === "object" && raw !== null) {
      const mapped = normalizeCategory((raw as { category?: unknown }).category);
      if (mapped !== null) s = { ...(raw as object), category: mapped };
    }
    if (!isWellFormed(s)) {
      droppedCount++;
      continue;
    }
    const normalized = normalizeUrl(s.url);
    if (normalized !== null && searchUrls.has(normalized)) {
      kept.push(sanitizeOptionalFields(s, searchUrls));
    } else {
      droppedCount++;
    }
  }
  return { kept, droppedCount };
}

/* Diagnostic companion to the gate: says, per dropped suggestion, WHICH
 * check failed — so an all-dropped run is explainable from logs instead
 * of a mystery. Never used to un-drop anything. */
export interface DropExplanation {
  who_or_what: string;
  reason:
    | "unknown_category"
    | "missing_field"
    | "unparseable_url"
    | "url_not_in_search_results";
  category?: string;
  url?: string;
  normalizedUrl?: string;
  closestSearchUrl?: string;
}

function closestMatch(target: string, candidates: Set<string>): string | null {
  let best: string | null = null;
  let bestLen = 0;
  for (const c of candidates) {
    let i = 0;
    const max = Math.min(target.length, c.length);
    while (i < max && target[i] === c[i]) i++;
    if (i > bestLen) {
      bestLen = i;
      best = c;
    }
  }
  return best;
}

export function explainDrops(
  suggestions: unknown,
  searchUrls: Set<string>,
): DropExplanation[] {
  const out: DropExplanation[] = [];
  if (!Array.isArray(suggestions)) return out;
  for (const s of suggestions) {
    if (typeof s !== "object" || s === null) {
      out.push({ who_or_what: "(non-object)", reason: "missing_field" });
      continue;
    }
    const o = s as Record<string, unknown>;
    const who = typeof o.who_or_what === "string" ? o.who_or_what : "(unnamed)";
    const mapped = normalizeCategory(o.category);
    if (mapped === null) {
      out.push({
        who_or_what: who,
        reason: "unknown_category",
        category: typeof o.category === "string" ? o.category : String(o.category),
      });
      continue;
    }
    if (!isWellFormed({ ...o, category: mapped })) {
      out.push({ who_or_what: who, reason: "missing_field" });
      continue;
    }
    const url = String(o.url);
    const normalized = normalizeUrl(url);
    if (normalized === null) {
      out.push({ who_or_what: who, reason: "unparseable_url", url });
      continue;
    }
    if (!searchUrls.has(normalized)) {
      out.push({
        who_or_what: who,
        reason: "url_not_in_search_results",
        url,
        normalizedUrl: normalized,
        closestSearchUrl: closestMatch(normalized, searchUrls) ?? undefined,
      });
    }
  }
  return out;
}

/* Optional fields follow the same rule as the suggestion itself: contact
 * details survive only when their URL was actually returned by a search.
 * A contact without a grounded URL is stripped — the suggestion stays,
 * the unverifiable detail does not. */
function sanitizeOptionalFields(
  s: Suggestion,
  searchUrls: Set<string>,
): Suggestion {
  const out: Suggestion = {
    category: s.category,
    who_or_what: s.who_or_what,
    why_needed: s.why_needed,
    url: s.url,
    source_title: s.source_title,
  };
  if (typeof s.why_good === "string" && s.why_good.trim().length > 0) {
    out.why_good = s.why_good;
  }
  if (
    typeof s.contact === "string" && s.contact.trim().length > 0 &&
    typeof s.contact_url === "string"
  ) {
    const contactNorm = normalizeUrl(s.contact_url);
    if (contactNorm !== null && searchUrls.has(contactNorm)) {
      out.contact = s.contact;
      out.contact_url = s.contact_url;
    }
  }
  return out;
}
