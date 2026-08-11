import {
  applyGroundingGate,
  type GateResult,
} from "./grounding.js";

export const SAFE_PROVIDER_ERROR =
  "source providers are unavailable right now — try again in a moment";

/**
 * The provider adapters own their API-specific parsing. The orchestrator only
 * needs the proposed suggestions and the URLs returned by that same run.
 */
export interface ProviderRun {
  suggestions: unknown;
  searchUrls: Set<string>;
}

export type ProviderFallbackResult<
  TAnthropic extends ProviderRun,
  TOpenAI extends ProviderRun,
> =
  | {
    ok: true;
    provider: "anthropic";
    run: TAnthropic;
    grounded: GateResult;
  }
  | {
    ok: true;
    provider: "openai";
    run: TOpenAI;
    grounded: GateResult;
  }
  | {
    ok: false;
    error: typeof SAFE_PROVIDER_ERROR;
  };

export async function runWithProviderFallback<
  TAnthropic extends ProviderRun,
  TOpenAI extends ProviderRun,
>(deps: {
  runAnthropic: () => Promise<TAnthropic>;
  runOpenAI: () => Promise<TOpenAI>;
}): Promise<ProviderFallbackResult<TAnthropic, TOpenAI>> {
  try {
    const run = await deps.runAnthropic();
    const grounded = applyGroundingGate(run.suggestions, run.searchUrls);
    // A syntactically complete primary response is still unusable when the
    // grounding contract rejects every suggestion. Treat that as a failed
    // primary attempt so the backup gets one chance to return usable leads.
    if (grounded.kept.length === 0) throw new Error("primary kept no suggestions");
    return {
      ok: true,
      provider: "anthropic",
      run,
      grounded,
    };
  } catch {
    try {
      const run = await deps.runOpenAI();
      return {
        ok: true,
        provider: "openai",
        run,
        grounded: applyGroundingGate(run.suggestions, run.searchUrls),
      };
    } catch {
      return { ok: false, error: SAFE_PROVIDER_ERROR };
    }
  }
}
