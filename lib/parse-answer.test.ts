import { describe, expect, it } from "vitest";
import { parseSuggestionsArray } from "./parse-answer.js";

const textBlock = (text: string) => ({ type: "text", text });

describe("parseSuggestionsArray — brackets in narration don't break parsing", () => {
  const array = `[{"category":"data","who_or_what":"X","why_needed":"Y","url":"https://a.gov/b","source_title":"T"}]`;

  it("parses a clean array-only answer", () => {
    const out = parseSuggestionsArray([textBlock(array)]);
    expect(Array.isArray(out)).toBe(true);
    expect(out).toHaveLength(1);
  });

  it("survives bracketed narration before the array in the same block", () => {
    const out = parseSuggestionsArray([
      textBlock(`Results [1] and [2] were useful.\n\n${array}`),
    ]);
    expect(out).toHaveLength(1);
  });

  it("prefers the final text block over earlier narration blocks", () => {
    const out = parseSuggestionsArray([
      textBlock("Searching for [important] context..."),
      textBlock("More notes [3]"),
      textBlock(array),
    ]);
    expect(out).toHaveLength(1);
  });

  it("handles code fences", () => {
    const out = parseSuggestionsArray([textBlock("```json\n" + array + "\n```")]);
    expect(out).toHaveLength(1);
  });

  it("parses the OUTER array when suggestions contain nested arrays", () => {
    const nested = `[{"category":"data","tags":["a","b"],"who_or_what":"X","why_needed":"Y","url":"https://a.gov/b","source_title":"T"}]`;
    const out = parseSuggestionsArray([
      textBlock(`Note [1]:\n${nested}`),
    ]);
    expect(out).toHaveLength(1);
    expect((out?.[0] as { tags: string[] }).tags).toEqual(["a", "b"]);
  });

  it("returns null when there is no array anywhere", () => {
    expect(parseSuggestionsArray([textBlock("I could not find sources.")])).toBeNull();
    expect(parseSuggestionsArray([textBlock("See [1] and [2].")])).toBeNull();
    expect(parseSuggestionsArray([])).toBeNull();
    expect(parseSuggestionsArray(null)).toBeNull();
  });

  it("returns null for a JSON object (not an array)", () => {
    expect(
      parseSuggestionsArray([textBlock(`{"suggestions": []}`)]),
    ).toEqual([]);
    // an object alone is not accepted
    expect(parseSuggestionsArray([textBlock(`{"a": 1}`)])).toBeNull();
  });
});
