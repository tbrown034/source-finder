/* Paid OpenAI fallback benchmark.
 *
 * Usage:
 *   set -a; source .env.local; set +a
 *   node_modules/.bin/tsx scripts/openai-harness.ts \
 *     [sampleId] [gpt-5.6-luna|gpt-5.6-terra|gpt-5.6-sol ...]
 *
 * Defaults to one faded-roads run on Terra. Every result passes through the
 * production OpenAI parser and the unchanged grounding gate.
 */

import {
  applyGroundingGate,
  explainDrops,
} from "../lib/grounding.js";
import { runOpenAiFallback } from "../lib/openai-fallback.js";
import { SAMPLE_DRAFTS, STORY_IDEAS } from "../lib/samples.js";

const KNOWN_MODELS = [
  "gpt-5.6-luna",
  "gpt-5.6-terra",
  "gpt-5.6-sol",
] as const;

const args = process.argv.slice(2);
const sampleId = args.find((arg) => !KNOWN_MODELS.includes(
  arg as (typeof KNOWN_MODELS)[number],
)) ?? "faded-roads";
const models = args.filter((arg): arg is (typeof KNOWN_MODELS)[number] =>
  KNOWN_MODELS.includes(arg as (typeof KNOWN_MODELS)[number])
);
const useModels = models.length > 0 ? models : ["gpt-5.6-terra"];

const draft = SAMPLE_DRAFTS.find((sample) => sample.id === sampleId);
const idea = STORY_IDEAS.find((sample) => sample.id === sampleId);
if (!draft && !idea) {
  console.error(`unknown sample: ${sampleId}`);
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY is not set");
  process.exit(1);
}

for (const model of useModels) {
  const started = Date.now();
  try {
    const run = await runOpenAiFallback({
      apiKey,
      text: (draft ?? idea)!.text,
      isIdea: Boolean(idea),
      model,
    });
    const grounded = applyGroundingGate(run.suggestions, run.searchUrls);
    console.log(
      `${model}  ${sampleId}: kept=${grounded.kept.length} dropped=${grounded.droppedCount} searches=${run.searchesRun} searchUrls=${run.searchUrls.size} inputTokens=${run.usage.inputTokens} outputTokens=${run.usage.outputTokens} ms=${Date.now() - started}`,
    );
    for (const suggestion of grounded.kept) {
      console.log(
        `  KEEP [${suggestion.category}] ${suggestion.who_or_what} — ${suggestion.why_needed}`,
      );
      console.log(`       ${suggestion.url}`);
    }
    for (const drop of explainDrops(run.suggestions, run.searchUrls)) {
      console.log(`  DROP [${drop.reason}] ${drop.who_or_what}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.log(`${model}  ${sampleId}: ERROR ${message}`);
  }
}
