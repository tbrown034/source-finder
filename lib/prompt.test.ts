import { describe, expect, it } from "vitest";
import { SYSTEM_PROMPT } from "./prompt.js";

describe("editorial prompt contract", () => {
  it("requires positive, non-verdict why-needed framing", () => {
    expect(SYSTEM_PROMPT).toContain(
      "Never make the draft or story the grammatical subject of a deficiency verb",
    );
    expect(SYSTEM_PROMPT).toContain("Start the sentence with the source, the voice, or the reader instead");
    expect(SYSTEM_PROMPT).not.toContain("why this story needs it");
    expect(SYSTEM_PROMPT).toContain("what this adds to the story");
  });

  it("requires the named source to match the cited page", () => {
    expect(SYSTEM_PROMPT).toContain(
      "The cited URL must also be the page for the exact source or record named in who_or_what",
    );
    expect(SYSTEM_PROMPT).toContain(
      "Never present a page about X as the page for X",
    );
    expect(SYSTEM_PROMPT).toContain(
      "who_or_what must name what the LINKED PAGE actually is",
    );
    expect(SYSTEM_PROMPT).toContain(
      "Do not upgrade a general department home page into a records portal",
    );
    expect(SYSTEM_PROMPT).toContain(
      "the exact title of that search result, copied without rewriting",
    );
  });

  it("requires contact details to come from the direct cited contact page", () => {
    expect(SYSTEM_PROMPT).toContain(
      "The contact_url must be the exact search-result page where that contact appears, not a related page",
    );
  });
});
