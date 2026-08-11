/* Records a sample fixture by running the real prompt + grounding gate
 * against the live Anthropic API — the same code path the serverless
 * function uses (lib/prompt.ts + lib/grounding.ts are imported directly;
 * Node's type stripping handles the .ts imports).
 *
 * Usage:
 *   set -a; source .env.local; set +a
 *   node scripts/record-sample.mjs <sampleId> > fixture-<sampleId>.json
 */

import {
  buildUserContent,
  MAX_SEARCHES,
  MAX_TOKENS,
  MODEL,
  SYSTEM_PROMPT,
} from "../lib/prompt.ts";
import {
  applyGroundingGate,
  collectSearchUrls,
} from "../lib/grounding.ts";
import { SAMPLE_DRAFTS } from "../lib/samples.ts";

const sampleId = process.argv[2];
const sample = SAMPLE_DRAFTS.find((s) => s.id === sampleId);
if (!sample) {
  console.error(
    `Unknown sample id "${sampleId}". Known: ${SAMPLE_DRAFTS.map((s) => s.id).join(", ")}`,
  );
  process.exit(1);
}
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is not set");
  process.exit(1);
}

const started = Date.now();
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    tools: [
      { type: "web_search_20250305", name: "web_search", max_uses: MAX_SEARCHES },
    ],
    messages: [{ role: "user", content: buildUserContent(sample.text, false) }],
  }),
});

if (!response.ok) {
  console.error(`API error ${response.status}: ${await response.text()}`);
  process.exit(1);
}
const payload = await response.json();
const ms = Date.now() - started;

const searchUrls = collectSearchUrls(payload.content);
let answerText = "";
for (const block of payload.content) {
  if (block.type === "text") answerText += block.text;
}
const cleaned = answerText.replace(/```json|```/g, "");
const start = cleaned.indexOf("[");
const end = cleaned.lastIndexOf("]");
if (start === -1 || end <= start) {
  console.error("No JSON array in model output:\n" + answerText);
  process.exit(1);
}
const suggestions = JSON.parse(cleaned.slice(start, end + 1));
const { kept, droppedCount } = applyGroundingGate(suggestions, searchUrls);

const fixture = {
  sampleId: sample.id,
  mode: "draft",
  suggestions: kept,
  droppedCount,
  searchesRun: payload.usage?.server_tool_use?.web_search_requests ?? null,
  searchUrlsNormalized: [...searchUrls].sort(),
  model: MODEL,
  ms,
  capturedOn: new Date().toISOString().slice(0, 10),
};

console.log(JSON.stringify(fixture, null, 2));
console.error(
  `kept=${kept.length} dropped=${droppedCount} searches=${fixture.searchesRun} ` +
    `in=${payload.usage?.input_tokens} out=${payload.usage?.output_tokens} ms=${ms}`,
);
