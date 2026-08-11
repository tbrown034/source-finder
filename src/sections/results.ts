/* Renders a result — recorded replay or live — grouped by the four
 * blindspot categories. Every render carries the verify-before-contacting
 * line and an honest dropped-count when suggestions were gated out. */

import { CATEGORIES } from "../../lib/categories.js";
import type { Suggestion } from "../../lib/grounding.js";
import { byId, el } from "../format.js";

export interface RenderOptions {
  provenance: string; // the recorded-vs-live label, always shown
  droppedCount: number;
  searchesRun: number | null;
  estimatedCostUsd: number | null;
  ms: number | null;
}

export function clearResults(): void {
  byId("results").replaceChildren();
}

export function renderResults(
  suggestions: Suggestion[],
  opts: RenderOptions,
): void {
  const root = byId("results");
  const frag = document.createDocumentFragment();

  const meta = el("p", "result-meta", opts.provenance);
  frag.appendChild(meta);

  const gateBits: string[] = [];
  if (opts.searchesRun !== null) {
    gateBits.push(`${opts.searchesRun} web searches run`);
  }
  gateBits.push(
    opts.droppedCount > 0
      ? `${opts.droppedCount} suggestion${opts.droppedCount === 1 ? "" : "s"} dropped for lacking a grounding search result`
      : "every suggestion below links the web search result it came from",
  );
  if (opts.ms !== null) gateBits.push(`${(opts.ms / 1000).toFixed(1)}s`);
  if (opts.estimatedCostUsd !== null) {
    gateBits.push(`estimated API cost $${opts.estimatedCostUsd.toFixed(2)}`);
  }
  frag.appendChild(el("p", "result-meta", gateBits.join(" · ")));

  const intro = el("p", "result-intro");
  intro.appendChild(el("strong", undefined, "A second set of eyes, not a grade."));
  intro.appendChild(
    document.createTextNode(
      " Every story has more possible voices than any one reporter can chase — that's the job, not a flaw in your draft. If this one stays a quick hit, skip all of this. If it grows into something bigger, here are leads worth a look.",
    ),
  );
  frag.appendChild(intro);

  const verify = el("p", "verify-note");
  verify.appendChild(el("strong", "verify-lead", "Verify before contacting."));
  verify.appendChild(
    document.createTextNode(
      " Every item below is a lead surfaced by a web search, not a vetted source. Confirm who they are and what they know with your own reporting.",
    ),
  );
  frag.appendChild(verify);

  for (const category of CATEGORIES) {
    const block = el("section", "category-block");
    block.appendChild(el("h3", undefined, category.label));
    block.appendChild(el("p", "category-q", category.question));

    const items = suggestions.filter((s) => s.category === category.id);
    if (items.length === 0) {
      block.appendChild(
        el(
          "p",
          "none-note",
          "No grounded suggestion survived for this category.",
        ),
      );
    }
    const itemsWrap = el("div", "category-items");
    for (const item of items) {
      const li = el("div", "lead-item");
      li.appendChild(el("p", "who", item.who_or_what));
      li.appendChild(el("p", "why", item.why_needed));
      if (item.why_good) {
        li.appendChild(el("p", "why-good", `Why this source: ${item.why_good}`));
      }
      if (item.contact && item.contact_url) {
        const contact = el("p", "contact");
        contact.appendChild(
          document.createTextNode(`Possible contact (unverified): ${item.contact} — `),
        );
        const ca = document.createElement("a");
        ca.href = item.contact_url;
        ca.textContent = "confirm here";
        ca.target = "_blank";
        ca.rel = "noopener noreferrer";
        contact.appendChild(ca);
        li.appendChild(contact);
      }
      const ground = el("p", "ground");
      ground.appendChild(
        document.createTextNode("Source — found in this run's web search: "),
      );
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.source_title || item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      ground.appendChild(a);
      li.appendChild(ground);
      itemsWrap.appendChild(li);
    }
    if (items.length > 0) block.appendChild(itemsWrap);
    frag.appendChild(block);
  }

  root.replaceChildren(frag);
  // Land with the input footer still in view so the reader keeps their
  // bearings — jumping straight to the results reads as a hard cut.
  (document.querySelector(".input-footer") ?? root).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
