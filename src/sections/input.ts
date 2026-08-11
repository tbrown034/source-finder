/* The input section: draft/idea mode toggle, clickable samples, character
 * counter, and the one fetch in the product. Recorded replay renders
 * instantly when a sample has a committed fixture; the live call is the
 * explicit click. Every failure path ends by pointing back at the
 * recorded sample, which never depends on the API. */

import { SAMPLE_DRAFTS, STORY_IDEAS } from "../../lib/samples.js";
import { RECORDED_RESULTS } from "../../lib/recorded-result.js";
import type { Suggestion } from "../../lib/grounding.js";
import { byId, el } from "../format.js";
import { clearResults, renderResults } from "./results.js";

type Mode = "draft" | "idea";

const MAX_CHARS = 8000;

export function initInput(): void {
  const textarea = byId<HTMLTextAreaElement>("storyText");
  const charCount = byId<HTMLSpanElement>("charCount");
  const findBtn = byId<HTMLButtonElement>("findBtn");
  const sampleRow = byId<HTMLDivElement>("sampleRow");
  const sampleNote = byId<HTMLParagraphElement>("sampleNote");
  const status = byId<HTMLDivElement>("status");
  const modeDraftBtn = byId<HTMLButtonElement>("modeDraft");
  const modeIdeaBtn = byId<HTMLButtonElement>("modeIdea");

  let mode: Mode = "draft";
  let activeSampleId: string | null = null;
  let running = false;
  let runSeq = 0;

  /* Any change to the input invalidates an in-flight request: its
   * response would describe text the user is no longer looking at.
   * Bumping runSeq makes the stale response's handlers no-ops; state
   * is reset here so the button never stays stuck disabled. */
  function cancelInFlight(): void {
    runSeq++;
    running = false;
    findBtn.disabled = false;
  }

  function updateCount(): void {
    const n = textarea.value.length;
    charCount.textContent = `${n.toLocaleString()} / ${MAX_CHARS.toLocaleString()}`;
    charCount.classList.toggle("is-limit", n >= MAX_CHARS);
  }

  function setStatus(text: string, isError = false): void {
    if (!text) {
      status.replaceChildren();
      return;
    }
    const line = el("p", isError ? "status-line is-error" : "status-line", text);
    status.replaceChildren(line);
  }

  function renderSamples(): void {
    const frag = document.createDocumentFragment();
    const label = el(
      "p",
      "sample-label",
      mode === "draft"
        ? "Or load a sample draft (facts from real Houston Chronicle reporting; prose written for this demo)"
        : "Or start from an example assignment",
    );
    frag.appendChild(label);

    if (mode === "draft") {
      for (const sample of SAMPLE_DRAFTS) {
        const btn = el("button", "sample-btn") as HTMLButtonElement;
        btn.type = "button";
        btn.appendChild(el("span", "kind", sample.kind));
        btn.appendChild(document.createTextNode(sample.title));
        btn.addEventListener("click", () => loadDraftSample(sample.id));
        frag.appendChild(btn);
      }
    } else {
      for (const idea of STORY_IDEAS) {
        const btn = el("button", "sample-btn", idea.text) as HTMLButtonElement;
        btn.type = "button";
        btn.addEventListener("click", () => {
          cancelInFlight();
          textarea.value = idea.text;
          activeSampleId = null;
          sampleNote.hidden = true;
          updateCount();
          clearResults();
          setStatus("");
        });
        frag.appendChild(btn);
      }
    }
    sampleRow.replaceChildren(frag);
  }

  function loadDraftSample(id: string): void {
    const sample = SAMPLE_DRAFTS.find((s) => s.id === id);
    if (!sample) return;
    cancelInFlight();
    textarea.value = sample.text;
    activeSampleId = sample.id;
    updateCount();

    sampleNote.hidden = false;
    sampleNote.replaceChildren();
    sampleNote.appendChild(
      document.createTextNode(
        "Written for this demo, drawing on facts reported in ",
      ),
    );
    const a = document.createElement("a");
    a.href = sample.basedOnUrl;
    a.textContent = sample.basedOnLabel;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    sampleNote.appendChild(a);
    sampleNote.appendChild(document.createTextNode("."));

    const recorded = RECORDED_RESULTS.find((r) => r.sampleId === id);
    if (recorded) {
      setStatus("");
      renderResults(recorded.suggestions, {
        provenance:
          `Recorded ${recorded.model} run (captured ${recorded.capturedOn}), replayed verbatim — no API call was made. Not convinced? "Find missed sources" runs it live.`,
        droppedCount: recorded.droppedCount,
        searchesRun: recorded.searchesRun,
        ms: recorded.ms,
      });
    } else {
      clearResults();
      setStatus("");
    }
  }

  function setMode(next: Mode): void {
    if (mode === next) return;
    cancelInFlight();
    mode = next;
    modeDraftBtn.classList.toggle("is-active", mode === "draft");
    modeIdeaBtn.classList.toggle("is-active", mode === "idea");
    modeDraftBtn.setAttribute("aria-selected", String(mode === "draft"));
    modeIdeaBtn.setAttribute("aria-selected", String(mode === "idea"));
    textarea.placeholder = mode === "draft"
      ? "Paste your draft here, or load one of the samples above."
      : "Describe the story you're planning — a sentence or two is enough. Or pick an example above.";
    textarea.value = "";
    activeSampleId = null;
    sampleNote.hidden = true;
    updateCount();
    renderSamples();
    clearResults();
    setStatus("");
  }

  async function findSources(): Promise<void> {
    const text = textarea.value.trim();
    if (!text) {
      setStatus("Paste a draft or describe your story first.", true);
      return;
    }
    if (running) return;
    running = true;
    const seq = ++runSeq;
    findBtn.disabled = true;
    clearResults();

    const startedAt = Date.now();
    setStatus(
      "Reading your text and running up to 8 real web searches. This usually takes one to two minutes.",
    );
    const tick = window.setInterval(() => {
      if (seq !== runSeq) return; // superseded — stop touching the status
      const s = Math.round((Date.now() - startedAt) / 1000);
      setStatus(
        `Reading your text and running up to 8 real web searches. This usually takes one to two minutes. (${s}s)`,
      );
    }, 1000);

    try {
      const resp = await fetch("/api/find-sources", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      if (seq !== runSeq) return;

      if (resp.status === 429) {
        setStatus(
          "The demo's request quota is used up for now. The recorded sample results above still work — they never touch the API.",
          true,
        );
        return;
      }
      if (!resp.ok) {
        setStatus(
          "The model call failed. Nothing was computed from a partial answer — try again in a minute, or use a recorded sample.",
          true,
        );
        return;
      }
      const data = (await resp.json()) as {
        suggestions: Suggestion[];
        dropped_count: number;
        searches_run: number | null;
        model: string;
        ms: number;
      };
      setStatus("");
      renderResults(data.suggestions, {
        provenance:
          `Found LIVE by ${data.model} just now${activeSampleId ? " for the loaded sample" : ""} — grounded against the web searches it ran for this request.`,
        droppedCount: data.dropped_count,
        searchesRun: data.searches_run,
        ms: data.ms,
      });
    } catch {
      if (seq === runSeq) {
        setStatus(
          "Could not reach the API. The recorded sample results still work — they never depend on it.",
          true,
        );
      }
    } finally {
      window.clearInterval(tick);
      if (seq === runSeq) {
        running = false;
        findBtn.disabled = false;
      }
    }
  }

  modeDraftBtn.addEventListener("click", () => setMode("draft"));
  modeIdeaBtn.addEventListener("click", () => setMode("idea"));
  textarea.addEventListener("input", () => {
    if (running) {
      cancelInFlight();
      setStatus("");
    }
    activeSampleId = null;
    sampleNote.hidden = true;
    updateCount();
  });
  findBtn.addEventListener("click", () => void findSources());

  updateCount();
  renderSamples();
}
