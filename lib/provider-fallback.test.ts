import { describe, expect, it, vi } from "vitest";
import {
  runWithProviderFallback,
  SAFE_PROVIDER_ERROR,
  type ProviderRun,
} from "./provider-fallback.js";

const SEARCH_URL = "https://example.org/report";

function runWithUrl(url = SEARCH_URL): ProviderRun {
  return {
    suggestions: [
      {
        category: "data",
        who_or_what: "The public report",
        why_needed: "The draft needs a checkable primary record.",
        url,
        source_title: "Public report",
      },
    ],
    searchUrls: new Set(["example.org/report"]),
  };
}

describe("runWithProviderFallback", () => {
  it("returns Anthropic success without calling OpenAI", async () => {
    const runAnthropic = vi.fn().mockResolvedValue(runWithUrl());
    const runOpenAI = vi.fn().mockResolvedValue(runWithUrl());

    const result = await runWithProviderFallback({ runAnthropic, runOpenAI });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.provider).toBe("anthropic");
    expect(result.grounded.kept).toHaveLength(1);
    expect(runAnthropic).toHaveBeenCalledTimes(1);
    expect(runOpenAI).not.toHaveBeenCalled();
  });

  it("calls OpenAI exactly once after Anthropic fails", async () => {
    const runAnthropic = vi.fn().mockRejectedValue(new Error("Anthropic failed"));
    const runOpenAI = vi.fn().mockResolvedValue(runWithUrl());

    const result = await runWithProviderFallback({ runAnthropic, runOpenAI });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.provider).toBe("openai");
    expect(result.grounded.kept).toHaveLength(1);
    expect(runAnthropic).toHaveBeenCalledTimes(1);
    expect(runOpenAI).toHaveBeenCalledTimes(1);
  });

  it("calls OpenAI when the primary run keeps no grounded suggestions", async () => {
    const runAnthropic = vi.fn().mockResolvedValue(
      runWithUrl("https://example.org/invented-page"),
    );
    const runOpenAI = vi.fn().mockResolvedValue(runWithUrl());

    const result = await runWithProviderFallback({ runAnthropic, runOpenAI });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.provider).toBe("openai");
    expect(result.grounded.kept).toHaveLength(1);
    expect(runAnthropic).toHaveBeenCalledTimes(1);
    expect(runOpenAI).toHaveBeenCalledTimes(1);
  });

  it("returns one safe error when both providers fail", async () => {
    const runAnthropic = vi.fn().mockRejectedValue(
      new Error("Anthropic failure containing upstream details"),
    );
    const runOpenAI = vi.fn().mockRejectedValue(
      new Error("OpenAI failure containing upstream details"),
    );

    const result = await runWithProviderFallback({ runAnthropic, runOpenAI });

    expect(result).toEqual({ ok: false, error: SAFE_PROVIDER_ERROR });
    expect(JSON.stringify(result)).not.toContain("upstream details");
    expect(runAnthropic).toHaveBeenCalledTimes(1);
    expect(runOpenAI).toHaveBeenCalledTimes(1);
  });

  it("applies the existing grounding gate to OpenAI fallback results", async () => {
    const runAnthropic = vi.fn().mockRejectedValue(new Error("Anthropic failed"));
    const runOpenAI = vi.fn().mockResolvedValue(
      runWithUrl("https://example.org/invented-page"),
    );

    const result = await runWithProviderFallback({ runAnthropic, runOpenAI });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.provider).toBe("openai");
    expect(result.grounded.kept).toHaveLength(0);
    expect(result.grounded.droppedCount).toBe(1);
    expect(runOpenAI).toHaveBeenCalledTimes(1);
  });
});
