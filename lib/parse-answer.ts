/* Extracting the suggestions array from the model's answer text.
 *
 * The prompt asks for ONLY a JSON array, but search-phase narration can
 * precede it, and narration often contains brackets ("[1]", markdown
 * citations). Anchoring on the first "[" would slice from prose and
 * reject a perfectly good answer. Instead: prefer the LAST text block,
 * and within a block walk "[" candidates from the innermost outward —
 * the first slice that parses to an array wins. Fails closed: no parse,
 * no suggestions. */

export function collectTextBlocks(content: unknown): string[] {
  const blocks: string[] = [];
  if (!Array.isArray(content)) return blocks;
  for (const block of content) {
    if (
      typeof block === "object" && block !== null &&
      (block as { type?: unknown }).type === "text" &&
      typeof (block as { text?: unknown }).text === "string"
    ) {
      blocks.push((block as { text: string }).text);
    }
  }
  return blocks;
}

function tryParseArray(text: string): unknown[] | null {
  const cleaned = text.replace(/```json|```/g, "");
  const end = cleaned.lastIndexOf("]");
  if (end === -1) return null;
  // Candidate "[" positions, nearest-to-the-end first: an inner bracket
  // sliced to the final "]" carries trailing junk and fails to parse,
  // so walking outward finds the real array; walking from the first "["
  // would start in prose.
  const starts: number[] = [];
  for (let i = cleaned.indexOf("["); i !== -1 && i < end; i = cleaned.indexOf("[", i + 1)) {
    starts.push(i);
  }
  for (let k = starts.length - 1; k >= 0; k--) {
    const start = starts[k];
    if (start === undefined) continue;
    try {
      const parsed: unknown = JSON.parse(cleaned.slice(start, end + 1));
      // Suggestions are objects; "[1]"-style narration brackets parse as
      // number arrays and must not count as an answer.
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            typeof item === "object" && item !== null && !Array.isArray(item),
        )
      ) {
        return parsed;
      }
    } catch {
      // keep walking outward
    }
  }
  return null;
}

export function parseSuggestionsArray(content: unknown): unknown[] | null {
  const blocks = collectTextBlocks(content);
  // The answer is expected in the final text block; earlier blocks are
  // search narration. Fall back block by block, then to the whole text.
  for (let i = blocks.length - 1; i >= 0; i--) {
    const parsed = tryParseArray(blocks[i] ?? "");
    if (parsed) return parsed;
  }
  return tryParseArray(blocks.join("\n"));
}
