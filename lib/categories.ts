/* The five blindspot categories. This list is the product's editorial spine:
 * the model is asked to think in these categories, the server validates
 * against them, and the page renders them in this order. One source of truth,
 * shared by the API function, the grounding gate, and the frontend. */

export interface Category {
  id: string;
  label: string;
  question: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    id: "affected",
    label: "People affected who aren't quoted",
    question: "Whose lives does this story change, and are they in it?",
  },
  {
    id: "opposing",
    label: "The strongest opposing or complicating perspective",
    question: "What would the best-informed skeptic of this story say?",
  },
  {
    id: "data",
    label: "Data and public records that could ground the story",
    question: "What documents or datasets would let a reader check the claims?",
  },
  {
    id: "experts",
    label: "Subject-matter experts",
    question: "Who studies this for a living and has no stake in the outcome?",
  },
  {
    id: "designed-out",
    label: "Who does this story design out?",
    question:
      "Which communities, languages, or accessibility needs does the framing leave behind?",
  },
] as const;

export const CATEGORY_IDS: readonly string[] = CATEGORIES.map((c) => c.id);

export function isKnownCategory(id: unknown): id is string {
  return typeof id === "string" && CATEGORY_IDS.includes(id);
}

/* Models sometimes echo the human-readable label instead of the id.
 * That mapping is deterministic (five fixed labels), so accepting it
 * loses nothing: an exact id passes as-is, an exact official label
 * (case-insensitive) maps to its id, anything else stays unknown. */
export function normalizeCategory(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (CATEGORY_IDS.includes(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  for (const c of CATEGORIES) {
    if (c.label.toLowerCase() === lower) return c.id;
  }
  return null;
}
