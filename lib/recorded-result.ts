/* Recorded results for sample mode — captured verbatim from the live
 * endpoint and replayed so the demo works instantly, free, and offline.
 * Labels on the page never blur recorded vs live.
 *
 * Currently null placeholders: populated by scripts/record-sample.mjs
 * output before launch. The fixture-integrity test re-runs the grounding
 * gate over whatever is committed here. */

import type { Suggestion } from "./grounding";

export interface RecordedResult {
  sampleId: string;
  mode: "draft" | "idea";
  suggestions: Suggestion[];
  droppedCount: number;
  searchesRun: number | null;
  /* Every URL the recorded run's web searches returned, normalized by
   * lib/grounding.normalizeUrl — kept so the gate can be re-verified
   * in tests and in the browser. */
  searchUrlsNormalized: string[];
  model: string;
  ms: number;
  capturedOn: string;
}

export const RECORDED_RESULTS: readonly RecordedResult[] = [];
