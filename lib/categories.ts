/* The four blindspot categories. This list is the product's editorial spine:
 * the model is asked to think in these categories, the server validates
 * against them, and the page renders them in this order. One source of truth,
 * shared by the API function, the grounding gate, and the frontend.
 *
 * Tone contract: labels and questions read as a colleague's checklist, not
 * a verdict on the reporter's draft. */

export interface Category {
  id: string;
  label: string;
  question: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    id: "affected",
    label: "People who may be affected",
    question:
      "Whose lives does this story touch — and are any voices, communities or languages not in it yet?",
  },
  {
    id: "opposing",
    label: "The strongest opposing or complicating perspective",
    question: "What would the best-informed skeptic add?",
  },
  {
    id: "data",
    label: "Data and public records worth a look",
    question: "What documents or datasets would let a reader check the claims?",
  },
  {
    id: "experts",
    label: "Subject-matter experts",
    question: "Who studies this for a living and has no stake in the outcome?",
  },
] as const;

/* The former fifth category ("designed-out") was absorbed into "affected".
 * Saved fixtures and older model output still carry it; the alias keeps
 * those suggestions alive through the gate instead of dropping them. */
const LEGACY_CATEGORY_ALIASES: Readonly<Record<string, string>> = {
  "designed-out": "affected",
  "who does this story design out?": "affected",
  "people affected who aren't quoted": "affected",
  "data and public records that could ground the story": "data",
};

export const CATEGORY_IDS: readonly string[] = CATEGORIES.map((c) => c.id);

export function isKnownCategory(id: unknown): id is string {
  return typeof id === "string" && CATEGORY_IDS.includes(id);
}

/* Models sometimes echo the human-readable label instead of the id.
 * That mapping is deterministic (fixed labels), so accepting it loses
 * nothing: an exact id passes as-is, an exact official label
 * (case-insensitive) maps to its id, a known legacy id or label maps to
 * its current home, anything else stays unknown. */
export function normalizeCategory(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (CATEGORY_IDS.includes(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  for (const c of CATEGORIES) {
    if (c.label.toLowerCase() === lower) return c.id;
  }
  return LEGACY_CATEGORY_ALIASES[lower] ?? null;
}
