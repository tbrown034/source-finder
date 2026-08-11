/* Small, explicit cost estimate for the two live models.
 *
 * Rates are per million tokens plus $0.01 per web-search call/search. They are
 * current for Aug. 11, 2026: Sonnet 5 introductory pricing ($2 input/$10
 * output) and GPT-5.6 Terra standard short-context pricing ($2 input/$12
 * output). This is an estimate, not provider billing data, and should be
 * updated when either published rate changes.
 */

interface UsageForCost {
  model: string;
  inputTokens: number | null;
  outputTokens: number | null;
  webSearches: number | null;
}

const RATES: Record<string, { input: number; output: number; search: number }> = {
  "claude-sonnet-5": { input: 2, output: 10, search: 0.01 },
  "gpt-5.6-terra": { input: 2, output: 12, search: 0.01 },
};

export function estimateApiCostUsd(usage: UsageForCost): number | null {
  const rate = RATES[usage.model];
  if (
    !rate ||
    usage.inputTokens === null || usage.inputTokens < 0 ||
    usage.outputTokens === null || usage.outputTokens < 0 ||
    usage.webSearches === null || usage.webSearches < 0
  ) return null;

  return (
    (usage.inputTokens / 1_000_000) * rate.input +
    (usage.outputTokens / 1_000_000) * rate.output +
    usage.webSearches * rate.search
  );
}
