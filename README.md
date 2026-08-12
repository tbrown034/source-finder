# Source Finder

Source Finder is a small newsroom concept demo. A reporter pastes a draft or
describes a story idea; an AI model searches the web and returns sources,
records and perspectives the reporter may have missed.

Live site: https://source-finder-five.vercel.app

The live site does not include local commits until Trevor reviews and pushes
them.

## MVP behavior

- Four draft examples and four story-idea examples.
- Clicking an example only loads its text; it does not show results or make an
  API call.
- The green action button explicitly runs both loaded examples and typed text.
- A saved, reviewed result appears only when a loaded example's live run
  fails.
- Live runs try Anthropic's `claude-sonnet-5` first, with up to five web
  searches.
- Only when Anthropic cannot complete a usable grounded run, the server makes
  one backup attempt
  through OpenAI's Responses API with `gpt-5.6-terra` and web search.
- Suggestions are grouped into four editorial blindspot categories.
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

Sonnet 5 is the primary model. Adaptive thinking is disabled for this
constrained JSON task so it does not consume the output budget. Anthropic's
[official Sonnet 5 announcement](https://www.anthropic.com/news/claude-sonnet-5)
lists introductory pricing through Aug. 31, 2026 at $2 per million input
tokens and $10 per million output tokens; starting Sept. 1, those rates become
$3 and $15. Anthropic's
[pricing documentation](https://platform.claude.com/docs/en/about-claude/pricing)
lists web search at $10 per 1,000 searches, plus token costs for search
content.

The OpenAI fallback uses `gpt-5.6-terra` only after Anthropic cannot complete a
usable grounded run. OpenAI describes Terra as its balance of intelligence and cost; its
[central API pricing table](https://platform.openai.com/docs/pricing) lists
short-context standard rates of $2 per million input tokens and $12 per
million output tokens, with web search at $10 per 1,000 calls plus search
content tokens. A fallback request can add OpenAI usage after a failed
Anthropic attempt, so spend limits should be set on both provider accounts.
Run details include an estimated API cost, calculated from that response's
reported tokens and search calls. Aug. 11 harness runs measured about $0.28
for Sonnet 5 and $0.12 for Terra on the same draft. The estimate is not
provider billing data and its rates must be updated when published pricing
changes.

Haiku remains out of the live path. It passed several runs, then returned nine
suggestions with missing required fields; the gate correctly kept 0/9. Luna
was cheaper but produced weaker source choices, while Sol showed no clear gain
over Terra for the extra cost and latency.

The endpoint allows 7 requests per IP per hour and 40 globally per day, but those
counters are in memory and reset across serverless instances. They are a
guardrail, not a hard cap. Provider account spend limits or prepaid balances
are the dependable cost fuses.

## Local checks

```sh
pnpm install
pnpm test
pnpm build
pnpm dev
```

Current local validation on Aug. 11, 2026:

- 111 tests pass.
- TypeScript and the Vite production build pass.
- All eight shipped examples have exactly one saved fixture.
- Every saved suggestion passes the current grounding gate.
- Handler-level tests pin primary success, one-time failover, and total failure.

## Paid regression harness

Only run this when changing the prompt, model or grounding behavior:

```sh
set -a; source .env.local; set +a
node_modules/.bin/tsx scripts/gate-harness.ts 1 --stream claude-sonnet-5 faded-roads
node_modules/.bin/tsx scripts/openai-harness.ts faded-roads gpt-5.6-terra
```

The harness spends real API credit. Ordinary tests and builds do not.

## Privacy and logging

Live text is sent to Anthropic first. If Anthropic is unavailable, the same
text is sent to OpenAI for one backup attempt. Search queries go to the web.
The site has no database. Production gate logs contain only aggregate drop
reasons, not suggestion text or URLs. The page warns reporters not to submit
confidential material.
