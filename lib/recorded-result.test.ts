/* Fixture-integrity tests: the committed recorded results must pass the
 * same grounding gate the server applies, re-run over the recorded search
 * URLs. If the gate's rules change, this test breaks before the demo
 * silently ships suggestions the gate would no longer allow. */

import { describe, expect, it } from "vitest";
import { RECORDED_RESULTS } from "./recorded-result.js";
import { applyGroundingGate } from "./grounding.js";
import { CATEGORY_IDS } from "./categories.js";
import { SAMPLE_DRAFTS } from "./samples.js";

describe("recorded fixtures — replayed data still passes the live gate", () => {
  it("at least one fixture is committed", () => {
    expect(RECORDED_RESULTS.length).toBeGreaterThan(0);
  });

  for (const fixture of RECORDED_RESULTS) {
    describe(`fixture ${fixture.sampleId}`, () => {
      it("belongs to a shipped sample draft", () => {
        expect(SAMPLE_DRAFTS.map((s) => s.id)).toContain(fixture.sampleId);
      });

      it("every recorded suggestion passes the grounding gate", () => {
        const { kept, droppedCount } = applyGroundingGate(
          fixture.suggestions,
          new Set(fixture.searchUrlsNormalized),
        );
        expect(droppedCount).toBe(0);
        expect(kept).toHaveLength(fixture.suggestions.length);
      });

      it("uses only known categories", () => {
        for (const s of fixture.suggestions) {
          expect(CATEGORY_IDS).toContain(s.category);
        }
      });

      it("records its provenance honestly", () => {
        expect(fixture.model).toBe("claude-sonnet-4-6");
        expect(fixture.capturedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(fixture.ms).toBeGreaterThan(0);
      });
    });
  }
});

describe("sample drafts", () => {
  it("every draft fits the 8,000-character input limit", () => {
    for (const s of SAMPLE_DRAFTS) {
      expect(s.text.length).toBeLessThanOrEqual(8000);
    }
  });

  it("every draft credits its source reporting with a Chronicle link", () => {
    for (const s of SAMPLE_DRAFTS) {
      expect(s.basedOnUrl).toMatch(/^https:\/\/www\.houstonchronicle\.com\//);
      expect(s.basedOnLabel.length).toBeGreaterThan(10);
    }
  });
});
