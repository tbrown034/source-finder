# Source Finder

Source Finder is a small newsroom concept demo. A reporter pastes a draft or
describes a story idea; Claude searches the web and returns sources, records
and perspectives the reporter may have missed.

Live site: https://source-finder-five.vercel.app

The live site does not include local commits until Trevor reviews and pushes
them.

## MVP behavior

- Four draft examples and four story-idea examples.
- Clicking an example shows a saved, reviewed result immediately and makes no
  API call.
- "Run it live instead" and typed submissions call the API explicitly.
- Live results use `claude-sonnet-4-6` with up to five web searches.
- Suggestions are grouped into five editorial blindspot categories.
- Every displayed suggestion URL must have appeared in a search result from
  that same model response.

## The grounding contract

`lib/grounding.ts` is the core safety gate. It deletes every suggestion whose
URL did not appear in an actual `web_search_tool_result` block from the same
response. Saved examples are checked through the same gate again in the
browser before they render. Do not weaken this behavior.

This proves URL membership, not that the linked page supports the model's
description. Every result is therefore a lead to verify, never a source to
quote. The model is instructed to suggest organizations, officials, public
records and expert roles rather than private individuals; that instruction is
not a deterministic guarantee, so live output still requires human review.

## Architecture

- Vite + TypeScript static page
- One Vercel serverless function: `api/find-sources.ts`
- No framework or runtime dependencies
- Imperative DOM rendering; no `innerHTML`
- Strict content security policy in `vercel.json`
- No database

## Cost controls

Sonnet 4.6 remains the live model because the local harness found that Haiku
more often reconstructed URLs that the gate correctly rejected. A measured
live run costs roughly $0.30-$0.40 and takes about a minute. Current official
pricing is $3 per million input tokens, $15 per million output tokens, plus
$0.01 per web search.

The endpoint allows 3 requests per IP per hour and 20 per day, but those
counters are in memory and reset across serverless instances. They are a
guardrail, not a hard cap. The Anthropic workspace spend limit or prepaid
balance is the dependable cost fuse.

## Local checks

```sh
pnpm install
pnpm test
pnpm build
pnpm dev
```

Current local validation on Aug. 11, 2026:

- 90 unit tests pass.
- TypeScript and the Vite production build pass.
- All eight shipped examples have exactly one saved fixture.
- Every saved suggestion passes the current grounding gate.
- The API handler itself does not yet have an HTTP-level integration test.

## Paid regression harness

Only run this when changing the prompt, model or grounding behavior:

```sh
set -a; source .env.local; set +a
node_modules/.bin/esbuild scripts/gate-harness.ts --bundle --format=esm \
  --platform=node --outfile=/tmp/gate-harness.mjs
node /tmp/gate-harness.mjs 3 --stream claude-sonnet-4-6 cyfair-bond
```

The harness spends real API credit. Ordinary tests and builds do not.

## Privacy and logging

Live text is sent to Anthropic and search queries go to the web. The site has
no database. Production gate logs contain only aggregate drop reasons, not
suggestion text or URLs. The page warns reporters not to submit confidential
material.
