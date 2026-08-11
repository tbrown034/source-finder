# Source Finder — Who is your story missing? (concept demo)

A reporter pastes a story draft or describes a story idea. The tool reads it,
runs real web searches, and returns the sources and perspectives the story may
be missing — grouped by blindspot, every suggestion grounded in a live search
result. **This is a demo, not a product.** It is an editorial-craft mirror,
not a replacement for editors, and every suggestion is a lead to verify, never
a source to quote.

Live: https://source-finder-five.vercel.app · Sibling project:
[Foreclosure Navigator](https://foreclosure-navigator.vercel.app), same design
contract.

## The design contract

1. **Every suggestion is grounded in an actual web search result.** The model
   is asked to cite the exact URL of a search result it received;
   `lib/grounding.ts` then drops, server-side, every suggestion whose URL did
   not appear in a `web_search_tool_result` block from the same API response.
   No from-memory citations reach the page, and the page says how many
   suggestions were dropped.
2. **Leads to verify, never sources to quote.** A verify-before-contacting
   line sits on every result. Optional contact details survive only when
   their URL also passes the grounding gate, and are always labeled
   unverified.
3. **No private individuals.** The tool suggests organizations, public
   officials in their official capacity, datasets, public records, and expert
   roles. This is enforced in the prompt and is part of the product's shape.
4. **Recorded replay by default, live on demand.** Two sample drafts carry
   recorded claude-sonnet-4-6 runs, captured by `scripts/record-sample.ts`
   through the same prompt and gate the server uses, and replayed verbatim
   at no cost. Labels never blur recorded vs live.
5. **Disclosure on the page.** What the model does, what gets sent (the
   pasted text to Anthropic, search queries to the web), and what the tool
   never does (judge the story, contact anyone, replace editorial judgment).

## Architecture

Vite + TypeScript static page, hand-rolled token CSS (light/dark/print), one
Vercel serverless function, no framework, no runtime dependencies. Rendering
is imperative DOM — no `innerHTML` — which is what makes the strict CSP in
`vercel.json` possible.

```
index.html              the page: input, results, disclosure
src/                    behavior modules (input, results) + token CSS
lib/grounding.ts        THE GATE: pure functions, unit-tested
lib/prompt.ts           model config + system prompt (one source of truth)
lib/samples.ts          six original sample drafts + six story ideas
lib/recorded-result.ts  recorded fixtures, replayed client-side
api/find-sources.ts     the one model call: claude-sonnet-4-6 + web_search
api/_shared.ts          rate limiting (fail closed)
scripts/record-sample.ts  records fixtures through the real prompt + gate
```

The sample drafts were written for this demo. Their facts draw on real
Houston Chronicle reporting, credited and linked on each sample; no Chronicle
text is reproduced.

## What was actually tested (Aug 11, 2026)

- 55 vitest unit tests: the grounding gate (URL normalization, adversarial
  same-domain invented links, credentialed-URL rejection, empty-search
  drops-everything, contact gating), JSON extraction from model answers
  (bracketed narration, nested arrays, fences), the rate limiter (windows,
  caps, daily reset), and fixture integrity (the committed recorded results
  re-pass the live gate — which the browser also re-runs at replay time).
- One real production round-trip after deploy: 15 suggestions, 0 dropped,
  7 searches, 85s, HTTP 200.
- Recorded fixtures were captured live through the production code path
  (two runs: 14 suggestions each, 0 dropped by the gate, 6-7 searches).
- Zero console errors; no horizontal overflow at 360px; light, dark, and
  print styles.

## Running it

```
pnpm install
pnpm test          # vitest
pnpm build         # tsc --noEmit && vite build
pnpm dev           # page only; /api needs `vercel dev` and ANTHROPIC_API_KEY
```

## Honest limitations

Grounding proves a URL came from a search result — it does not prove the
page says what the model claims it says, which is why every item is a lead to
verify. URL matching tolerates scheme, fragment, and trailing-slash variants
of a searched URL (documented tradeoff; query strings are matched exactly).
Rate limiting is in-memory and per-serverless-instance: cold starts reset the
counters, so the per-IP 3/hour and global 100/day caps are approximate — the
real cost fuse is the Anthropic account spend limit. Live calls take one to
two minutes and cost roughly $0.30-0.40 each (mostly search-result input
tokens), which is a real cost constraint on making this a daily-driver tool.
Junk or very thin input can produce a model response with no parseable
suggestion list; the server returns an honest 502 and computes nothing from
it. Contact details are the one model-authored string code cannot verify:
their URL must pass the grounding gate, but the value itself (a phone
number, an email) could still be wrong — which is why every contact is
labeled unverified with a confirm-here link, and why the verify-first rule
is on the page at all. The endpoint handler is thin and not covered by HTTP-level tests (its
gates are unit-tested). Suggestions reflect what web search surfaces, which
over-represents institutions with good SEO — the tool can have the very
blindspots it is trying to surface, and a reporter's judgment remains the
product's premise, not its replacement.
