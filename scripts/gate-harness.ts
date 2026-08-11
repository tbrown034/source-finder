/* Regression harness for the live path: runs the real prompt + grounding
 * gate against sample inputs on one or more models and reports, per run,
 * how many suggestions were kept, how many dropped, and WHY each drop
 * happened. This is the evidence tool for prompt or model changes — run
 * it before and after touching lib/prompt.ts.
 *
 * Usage (bundle through esbuild, key from the environment):
 *   set -a; source .env.local; set +a
 *   node_modules/.bin/esbuild scripts/gate-harness.ts --bundle --format=esm \
 *     --platform=node --outfile=/tmp/gate-harness.mjs \
 *   && node /tmp/gate-harness.mjs [runsPerCase] [model ...] [sampleId ...]
 *
 * Defaults: 1 run per case, both models, three samples
 * (cyfair-bond draft, constable-raises draft, storm-readiness idea).
 * Cost guide: a haiku run is roughly $0.05-0.10, a sonnet run $0.25-0.40. */

import {
  buildUserContent,
  MAX_SEARCHES,
  MAX_TOKENS,
  SYSTEM_PROMPT,
} from "../lib/prompt.js";
import {
  applyGroundingGate,
  collectSearchUrls,
  explainDrops,
} from "../lib/grounding.js";
import { SAMPLE_DRAFTS, STORY_IDEAS } from "../lib/samples.js";
import { parseSuggestionsArray } from "../lib/parse-answer.js";
import { SseParser, StreamAccumulator } from "../lib/sse-accumulator.js";

const KNOWN_MODELS = ["claude-haiku-4-5", "claude-sonnet-4-6"];
const DEFAULT_SAMPLES = ["cyfair-bond", "constable-raises", "storm-readiness"];

const args = process.argv.slice(2);
/* --stream exercises the exact reassembly path the deployed function
 * uses (SSE -> StreamAccumulator); without it, plain non-streaming. */
const useStream = args.includes("--stream");
if (useStream) args.splice(args.indexOf("--stream"), 1);
const runs = /^\d+$/.test(args[0] ?? "") ? Number(args.shift()) : 1;
const models = args.filter((a) => KNOWN_MODELS.includes(a));
const sampleIds = args.filter((a) => !KNOWN_MODELS.includes(a));
const useModels = models.length ? models : KNOWN_MODELS;
const useSamples = sampleIds.length ? sampleIds : DEFAULT_SAMPLES;

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is not set");
  process.exit(1);
}

function findInput(id: string): { text: string; isIdea: boolean } | null {
  const draft = SAMPLE_DRAFTS.find((s) => s.id === id);
  if (draft) return { text: draft.text, isIdea: false };
  const idea = STORY_IDEAS.find((s) => s.id === id);
  if (idea) return { text: idea.text, isIdea: true };
  return null;
}

async function runOnce(model: string, text: string, isIdea: boolean) {
  const started = Date.now();
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey as string,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      stream: useStream,
      system: SYSTEM_PROMPT,
      tools: [
        { type: "web_search_20250305", name: "web_search", max_uses: MAX_SEARCHES },
      ],
      messages: [{ role: "user", content: buildUserContent(text, isIdea) }],
    }),
  });
  if (!response.ok) {
    return { error: `HTTP ${response.status}: ${(await response.text()).slice(0, 200)}` };
  }
  let content: unknown;
  let usage: { server_tool_use?: { web_search_requests?: number } } | undefined;
  if (useStream) {
    const parser = new SseParser();
    const acc = new StreamAccumulator();
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      for (const event of parser.feed(decoder.decode(value, { stream: true }))) {
        acc.feed(event);
      }
    }
    content = acc.content();
    usage = acc.usage;
  } else {
    const payload = await response.json();
    content = payload.content;
    usage = payload.usage;
  }
  const searchUrls = collectSearchUrls(content);
  const suggestions = parseSuggestionsArray(content);
  if (!suggestions) return { error: "no parseable array", ms: Date.now() - started };
  const { kept, droppedCount } = applyGroundingGate(suggestions, searchUrls);
  return {
    kept: kept.length,
    dropped: droppedCount,
    searches: usage?.server_tool_use?.web_search_requests ?? null,
    searchUrlCount: searchUrls.size,
    ms: Date.now() - started,
    drops: explainDrops(suggestions, searchUrls),
    keptSample: kept.slice(0, 3).map((k) => k.who_or_what),
  };
}

for (const model of useModels) {
  for (const id of useSamples) {
    const input = findInput(id);
    if (!input) {
      console.error(`unknown sample: ${id}`);
      continue;
    }
    for (let i = 1; i <= runs; i++) {
      const r = await runOnce(model, input.text, input.isIdea);
      if ("error" in r) {
        console.log(`${model}  ${id}  run ${i}: ERROR ${r.error}`);
        continue;
      }
      console.log(
        `${model}${useStream ? "(stream)" : ""}  ${id}  run ${i}: kept=${r.kept} dropped=${r.dropped} searches=${r.searches} searchUrls=${r.searchUrlCount} ms=${r.ms}`,
      );
      for (const d of r.drops ?? []) {
        const detail = d.reason === "url_not_in_search_results"
          ? ` url=${d.normalizedUrl} closest=${d.closestSearchUrl}`
          : d.reason === "unknown_category"
          ? ` category=${JSON.stringify(d.category)}`
          : "";
        console.log(`    DROP [${d.reason}] ${d.who_or_what.slice(0, 60)}${detail}`);
      }
    }
  }
}
