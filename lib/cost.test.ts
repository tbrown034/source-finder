import { describe, expect, it } from "vitest";
import { estimateApiCostUsd } from "./cost.js";

describe("estimateApiCostUsd", () => {
  it("estimates the measured Sonnet 5 run", () => {
    expect(estimateApiCostUsd({
      model: "claude-sonnet-5",
      inputTokens: 97_761,
      outputTokens: 3_102,
      webSearches: 5,
    })).toBeCloseTo(0.276542, 6);
  });

  it("estimates the measured Terra run", () => {
    expect(estimateApiCostUsd({
      model: "gpt-5.6-terra",
      inputTokens: 31_540,
      outputTokens: 2_107,
      webSearches: 3,
    })).toBeCloseTo(0.118364, 6);
  });

  it("returns null for unknown models or incomplete usage", () => {
    expect(estimateApiCostUsd({
      model: "unknown",
      inputTokens: 1,
      outputTokens: 1,
      webSearches: 1,
    })).toBeNull();
    expect(estimateApiCostUsd({
      model: "claude-sonnet-5",
      inputTokens: null,
      outputTokens: 1,
      webSearches: 1,
    })).toBeNull();
  });
});
