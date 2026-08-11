/* Reassembles a Messages API streaming response into the same content
 * array a non-streaming call returns, and surfaces progress moments the
 * page can narrate (search started, search returned, writing answer).
 *
 * Pure state machine over parsed SSE events — no I/O — so it is
 * unit-testable and shared by the serverless function. */

export interface ProgressEvent {
  kind: "search_started" | "search_returned" | "writing";
  /* search number (1-based) for search events */
  n?: number;
  /* the search query, when the model's tool input has arrived */
  query?: string;
  /* how many results came back */
  resultCount?: number;
}

interface BlockState {
  block: Record<string, unknown>;
  partialJson: string;
  text: string;
}

export interface Usage {
  input_tokens?: number;
  output_tokens?: number;
  server_tool_use?: { web_search_requests?: number };
}

export class StreamAccumulator {
  private blocks = new Map<number, BlockState>();
  private searchCount = 0;
  /* server_tool_use id → search number, so results attribute to the
   * right search even when they arrive out of order */
  private searchIds = new Map<string, number>();
  private sawText = false;
  usage: Usage = {};

  /* Feed one parsed SSE event; returns progress worth narrating, if any. */
  feed(event: { type?: unknown } & Record<string, unknown>): ProgressEvent | null {
    switch (event.type) {
      case "message_start": {
        const usage = (event.message as { usage?: Usage } | undefined)?.usage;
        if (usage) this.usage = { ...this.usage, ...usage };
        return null;
      }
      case "content_block_start": {
        const index = event.index as number;
        const block = { ...(event.content_block as Record<string, unknown>) };
        this.blocks.set(index, { block, partialJson: "", text: "" });
        if (block.type === "server_tool_use") {
          this.searchCount++;
          if (typeof block.id === "string") {
            this.searchIds.set(block.id, this.searchCount);
          }
          return { kind: "search_started", n: this.searchCount };
        }
        if (block.type === "web_search_tool_result") {
          const content = block.content;
          const toolUseId = block.tool_use_id;
          const n = typeof toolUseId === "string"
            ? this.searchIds.get(toolUseId) ?? this.searchCount
            : this.searchCount;
          return {
            kind: "search_returned",
            n,
            resultCount: Array.isArray(content) ? content.length : 0,
          };
        }
        if (block.type === "text" && !this.sawText && this.searchCount > 0) {
          this.sawText = true;
          return { kind: "writing" };
        }
        return null;
      }
      case "content_block_delta": {
        const state = this.blocks.get(event.index as number);
        if (!state) return null;
        const delta = event.delta as { type?: string; text?: string; partial_json?: string };
        if (delta.type === "text_delta" && typeof delta.text === "string") {
          state.text += delta.text;
        } else if (
          delta.type === "input_json_delta" && typeof delta.partial_json === "string"
        ) {
          state.partialJson += delta.partial_json;
        }
        return null;
      }
      case "content_block_stop": {
        const state = this.blocks.get(event.index as number);
        if (!state) return null;
        if (state.block.type === "server_tool_use" && state.partialJson) {
          try {
            const input = JSON.parse(state.partialJson) as { query?: unknown };
            state.block.input = input;
            if (typeof input.query === "string") {
              return {
                kind: "search_started",
                n: this.searchCount,
                query: input.query,
              };
            }
          } catch {
            // input stays partial; progress just loses the query text
          }
        }
        return null;
      }
      case "message_delta": {
        const usage = event.usage as Usage | undefined;
        if (usage) this.usage = { ...this.usage, ...usage };
        return null;
      }
      default:
        return null;
    }
  }

  /* Searches narrated so far — the number the page's wire showed. The
   * done line reports THIS count so the two can never disagree. */
  get searchesRun(): number {
    return this.searchCount;
  }

  /* The reassembled content array, in block order. */
  content(): unknown[] {
    const out: unknown[] = [];
    for (const index of [...this.blocks.keys()].sort((a, b) => a - b)) {
      const state = this.blocks.get(index);
      if (!state) continue;
      if (state.block.type === "text") {
        out.push({ ...state.block, text: state.text });
      } else {
        out.push(state.block);
      }
    }
    return out;
  }
}

/* Minimal SSE line parser: feed raw chunks, get parsed JSON data events.
 * Anthropic's stream is `event: X\ndata: {...}\n\n`; data lines carry the
 * event type again, so data alone is enough. */
export class SseParser {
  private buffer = "";

  feed(chunk: string): Array<Record<string, unknown>> {
    this.buffer += chunk;
    const events: Array<Record<string, unknown>> = [];
    let idx: number;
    while ((idx = this.buffer.indexOf("\n\n")) !== -1) {
      const raw = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 2);
      for (const line of raw.split("\n")) {
        if (!line.startsWith("data:")) continue;
        try {
          const parsed: unknown = JSON.parse(line.slice(5).trim());
          if (typeof parsed === "object" && parsed !== null) {
            events.push(parsed as Record<string, unknown>);
          }
        } catch {
          // ignore unparseable keep-alives
        }
      }
    }
    return events;
  }
}
