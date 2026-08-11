/* The input section: draft/idea mode toggle, clickable samples, character
 * counter, and the one fetch in the product. Recorded replay renders
 * instantly when a sample has a committed fixture; the live call is the
 * explicit click. Every failure path ends by pointing back at the
 * recorded sample, which never depends on the API. */

import { SAMPLE_DRAFTS, STORY_IDEAS } from "../../lib/samples.js";
import { RECORDED_RESULTS } from "../../lib/recorded-result.js";
import { applyGroundingGate, type Suggestion } from "../../lib/grounding.js";
import type { RecordedResult } from "../../lib/recorded-result.js";
import { byId, el } from "../format.js";
import { clearResults, renderResults } from "./results.js";

type Mode = "draft" | "idea";

const MAX_CHARS = 8000;
const MIN_CHARS = 40;
const SAMPLES_SHOWN = 4;

export function initInput(): void {
  const textarea = byId<HTMLTextAreaElement>("storyText");
  const charCount = byId<HTMLSpanElement>("charCount");
  const findBtn = byId<HTMLButtonElement>("findBtn");
  const sampleRow = byId<HTMLDivElement>("sampleRow");
  const sampleNote = byId<HTMLParagraphElement>("sampleNote");
  const status = byId<HTMLDivElement>("status");
  const modeDraftBtn = byId<HTMLButtonElement>("modeDraft");
  const modeIdeaBtn = byId<HTMLButtonElement>("modeIdea");

  const progressLog = byId<HTMLDivElement>("progressLog");

  let mode: Mode = "draft";
  let activeSampleId: string | null = null;
  let running = false;
  let runSeq = 0;
  let samplesExpanded = false;

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
    if (isError) {
      // Every dead end gets a way out.
      line.appendChild(document.createTextNode(" "));
      const reset = el("button", "linklike", "Start over") as HTMLButtonElement;
      reset.type = "button";
      reset.addEventListener("click", startOver);
      line.appendChild(reset);
    }
    status.replaceChildren(line);
  }

  function startOver(): void {
    cancelInFlight();
    textarea.value = "";
    activeSampleId = null;
    sampleNote.hidden = true;
    updateCount();
    clearResults();
    progressLog.replaceChildren();
    setStatus("");
    textarea.focus();
  }

  function renderSamples(): void {
    const frag = document.createDocumentFragment();
    const all = mode === "draft" ? SAMPLE_DRAFTS : STORY_IDEAS;
    const shown = samplesExpanded ? all : all.slice(0, SAMPLES_SHOWN);

    for (const item of shown) {
      const btn = el("button", "sample-btn") as HTMLButtonElement;
      btn.type = "button";
      btn.title = mode === "draft"
        ? (item as (typeof SAMPLE_DRAFTS)[number]).title
        : (item as (typeof STORY_IDEAS)[number]).text;
      if (mode === "draft") {
        const sample = item as (typeof SAMPLE_DRAFTS)[number];
        btn.appendChild(el("span", "kind", sample.kind));
        btn.appendChild(document.createTextNode(sample.chip));
        btn.addEventListener("click", () => loadDraftSample(sample.id));
      } else {
        const idea = item as (typeof STORY_IDEAS)[number];
        btn.appendChild(document.createTextNode(idea.chip));
        btn.addEventListener("click", () => {
          cancelInFlight();
          textarea.value = idea.text;
          activeSampleId = idea.id;
          sampleNote.hidden = true;
          updateCount();
          setStatus("");
          progressLog.replaceChildren();
          const recorded = RECORDED_RESULTS.find((r) => r.sampleId === idea.id);
          if (recorded) {
            renderRecorded(recorded);
          } else {
            clearResults();
          }
        });
      }
      frag.appendChild(btn);
    }

    if (all.length > SAMPLES_SHOWN) {
      const toggle = el(
        "button",
        "linklike sample-more",
        samplesExpanded
          ? "Show fewer"
          : `Show ${all.length - SAMPLES_SHOWN} more`,
      ) as HTMLButtonElement;
      toggle.type = "button";
      toggle.addEventListener("click", () => {
        samplesExpanded = !samplesExpanded;
        renderSamples();
      });
      frag.appendChild(toggle);
    }
    sampleRow.replaceChildren(frag);
  }

  function loadDraftSample(id: string): void {
    const sample = SAMPLE_DRAFTS.find((s) => s.id === id);
    if (!sample) return;
    cancelInFlight();
    textarea.value = sample.text;
    activeSampleId = sample.id;
    progressLog.replaceChildren();
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
    setStatus("");
    if (recorded) {
      renderRecorded(recorded);
    } else {
      clearResults();
    }
  }

  /* Replay runs the committed fixture back through the same grounding
   * gate the server applies — the honesty claim is enforced in the
   * browser, not just promised by CI. */
  function renderRecorded(recorded: RecordedResult): void {
    const { kept, droppedCount } = applyGroundingGate(
      recorded.suggestions,
      new Set(recorded.searchUrlsNormalized),
    );
    renderResults(kept, {
      provenance:
        `Recorded ${recorded.model} run (captured ${recorded.capturedOn}), replayed verbatim and re-checked against the grounding gate in your browser — no API call was made. Not convinced? "Find missed sources" runs it live.`,
      droppedCount: recorded.droppedCount + droppedCount,
      searchesRun: recorded.searchesRun,
      ms: recorded.ms,
    });
  }

  function setMode(next: Mode): void {
    if (mode === next) return;
    cancelInFlight();
    mode = next;
    samplesExpanded = false;
    progressLog.replaceChildren();
    modeDraftBtn.classList.toggle("is-active", mode === "draft");
    modeIdeaBtn.classList.toggle("is-active", mode === "idea");
    modeDraftBtn.setAttribute("aria-pressed", String(mode === "draft"));
    modeIdeaBtn.setAttribute("aria-pressed", String(mode === "idea"));
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

  interface DoneLine {
    suggestions: Suggestion[];
    dropped_count: number;
    searches_run: number | null;
    model: string;
    ms: number;
  }

  interface ProgressLine {
    kind: "search_started" | "search_returned" | "writing";
    n?: number;
    query?: string;
    resultCount?: number;
  }

  /* The wire: one mono log line per search, timestamped and updated in
   * place as its query arrives and its results come back — a live view
   * of the work, not a spinner. */
  const searchLines = new Map<number, HTMLElement>();
  let wireStart = 0;

  function stamp(): string {
    const s = Math.max(0, Math.round((Date.now() - wireStart) / 1000));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function logProgress(p: ProgressLine): void {
    if (p.kind === "writing") {
      progressLog.appendChild(
        el(
          "p",
          "progress-item",
          `${stamp()}  searches complete — writing suggestions`,
        ),
      );
      progressLog.scrollTop = progressLog.scrollHeight;
      return;
    }
    const n = p.n ?? 0;
    let lineEl = searchLines.get(n);
    if (!lineEl) {
      lineEl = el("p", "progress-item", `${stamp()}  search ${n} …`);
      searchLines.set(n, lineEl);
      progressLog.appendChild(lineEl);
    }
    if (p.kind === "search_started" && p.query) {
      lineEl.textContent = `${stamp()}  search ${n}  “${p.query}”`;
    } else if (p.kind === "search_returned" && !lineEl.dataset.returned) {
      lineEl.dataset.returned = "1";
      lineEl.textContent = `${lineEl.textContent} — ${p.resultCount ?? 0} results`;
    }
    progressLog.scrollTop = progressLog.scrollHeight;
  }

  async function findSources(): Promise<void> {
    const text = textarea.value.trim();
    if (!text) {
      setStatus("Paste a draft or describe your story first.", true);
      return;
    }
    if (text.length < MIN_CHARS) {
      setStatus(
        "Give the model a bit more to work with — at least a sentence or two of specifics.",
        true,
      );
      return;
    }
    if (running) return;
    running = true;
    const seq = ++runSeq;
    findBtn.disabled = true;
    clearResults();
    searchLines.clear();
    progressLog.replaceChildren();
    wireStart = Date.now();

    // Announce the wait sentence ONCE (role="status" would otherwise
    // re-announce constantly); live progress renders below, hidden from
    // screen readers, with ticking seconds likewise aria-hidden.
    const startedAt = Date.now();
    const line = el(
      "p",
      "status-line",
      "Working — the model is reading your text and searching the web. Each search appears below as it runs; expect one to two minutes. ",
    );
    const secondsEl = el("span", undefined, "");
    secondsEl.setAttribute("aria-hidden", "true");
    line.appendChild(secondsEl);
    status.replaceChildren(line);
    const tick = window.setInterval(() => {
      if (seq !== runSeq) return; // superseded — stop touching the status
      const s = Math.round((Date.now() - startedAt) / 1000);
      secondsEl.textContent = `(${s}s)`;
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
          "The demo's request quota is used up for now. The recorded sample results still work — they never touch the API.",
          true,
        );
        return;
      }
      if (!resp.ok || !resp.body) {
        const body = (await resp.json().catch(() => null)) as
          | { error?: string }
          | null;
        setStatus(
          body?.error
            ? `${body.error}.`
            : "The model call failed. Nothing was computed from a partial answer — try again in a minute, or use a recorded sample.",
          true,
        );
        return;
      }

      // NDJSON stream: progress lines, then exactly one done or error.
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;
      const handleLine = (raw: string): void => {
        if (!raw.trim() || finished) return;
        let parsed: { t?: string } & Record<string, unknown>;
        try {
          parsed = JSON.parse(raw) as { t?: string } & Record<string, unknown>;
        } catch {
          return;
        }
        if (parsed.t === "progress" && seq === runSeq) {
          logProgress(parsed as unknown as ProgressLine);
        } else if (parsed.t === "done") {
          finished = true;
          const data = parsed as unknown as DoneLine;
          setStatus("");
          progressLog.replaceChildren();
          renderResults(data.suggestions, {
            provenance:
              `Found LIVE by ${data.model} just now${activeSampleId ? " for the loaded sample" : ""} — grounded against the web searches it ran for this request.`,
            droppedCount: data.dropped_count,
            searchesRun: data.searches_run,
            ms: data.ms,
          });
        } else if (parsed.t === "error") {
          finished = true;
          progressLog.replaceChildren();
          setStatus(
            `${typeof parsed.error === "string" ? parsed.error : "The model call failed"}. Nothing was computed from a partial answer.`,
            true,
          );
        }
      };
      for (;;) {
        const { done, value } = await reader.read();
        if (seq !== runSeq) return;
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          handleLine(buffer.slice(0, idx));
          buffer = buffer.slice(idx + 1);
        }
      }
      handleLine(buffer);
      if (!finished && seq === runSeq) {
        progressLog.replaceChildren();
        setStatus(
          "The connection ended before the model finished. Nothing was computed from a partial answer — try again.",
          true,
        );
      }
    } catch {
      if (seq === runSeq) {
        progressLog.replaceChildren();
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
