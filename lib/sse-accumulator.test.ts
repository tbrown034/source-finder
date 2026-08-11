import { describe, expect, it } from "vitest";
import { SseParser, StreamAccumulator } from "./sse-accumulator.js";
import { collectSearchUrls } from "./grounding.js";
import { parseSuggestionsArray } from "./parse-answer.js";

describe("StreamAccumulator — streaming events reassemble to the sync shape", () => {
  it("accumulates text deltas, tool inputs, and search results", () => {
    const acc = new StreamAccumulator();
    const progress = [
      acc.feed({ type: "message_start", message: { usage: { input_tokens: 10 } } }),
      acc.feed({
        type: "content_block_start",
        index: 0,
        content_block: { type: "server_tool_use", id: "s1", name: "web_search", input: {} },
      }),
      acc.feed({
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"query":"cy-fair' },
      }),
      acc.feed({
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: ' bond"}' },
      }),
      acc.feed({ type: "content_block_stop", index: 0 }),
      acc.feed({
        type: "content_block_start",
        index: 1,
        content_block: {
          type: "web_search_tool_result",
          tool_use_id: "s1",
          content: [
            { type: "web_search_result", url: "https://a.gov/x", title: "X" },
            { type: "web_search_result", url: "https://b.org/y", title: "Y" },
          ],
        },
      }),
      acc.feed({
        type: "content_block_start",
        index: 2,
        content_block: { type: "text", text: "" },
      }),
      acc.feed({
        type: "content_block_delta",
        index: 2,
        delta: { type: "text_delta", text: '[{"category":"data",' },
      }),
      acc.feed({
        type: "content_block_delta",
        index: 2,
        delta: {
          type: "text_delta",
          text: '"who_or_what":"W","why_needed":"N","url":"https://a.gov/x","source_title":"X"}]',
        },
      }),
      acc.feed({ type: "content_block_stop", index: 2 }),
      acc.feed({ type: "message_delta", usage: { output_tokens: 55 } }),
    ];

    // Progress narration: search started (no query yet), query arrived,
    // results returned, writing began.
    expect(progress[1]).toEqual({ kind: "search_started", n: 1 });
    expect(progress[4]).toEqual({ kind: "search_started", n: 1, query: "cy-fair bond" });
    expect(progress[5]).toEqual({ kind: "search_returned", n: 1, resultCount: 2 });
    expect(progress[6]).toEqual({ kind: "writing" });

    // Reassembled content works with the existing gate + parser.
    const content = acc.content();
    expect(collectSearchUrls(content).size).toBe(2);
    const suggestions = parseSuggestionsArray(content);
    expect(suggestions).toHaveLength(1);
    expect(acc.usage.input_tokens).toBe(10);
    expect(acc.usage.output_tokens).toBe(55);
  });

  it("attributes out-of-order results to the right search via tool_use_id", () => {
    const acc = new StreamAccumulator();
    acc.feed({
      type: "content_block_start",
      index: 0,
      content_block: { type: "server_tool_use", id: "s1", name: "web_search", input: {} },
    });
    acc.feed({
      type: "content_block_start",
      index: 1,
      content_block: { type: "server_tool_use", id: "s2", name: "web_search", input: {} },
    });
    // search 1's result arrives after search 2 started
    const p = acc.feed({
      type: "content_block_start",
      index: 2,
      content_block: {
        type: "web_search_tool_result",
        tool_use_id: "s1",
        content: [{ type: "web_search_result", url: "https://a.gov/x", title: "X" }],
      },
    });
    expect(p).toEqual({ kind: "search_returned", n: 1, resultCount: 1 });
  });

  it("does not announce writing for a no-search response", () => {
    const acc = new StreamAccumulator();
    const p = acc.feed({
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    });
    expect(p).toBeNull();
  });
});

describe("SseParser", () => {
  it("parses events split across chunk boundaries", () => {
    const parser = new SseParser();
    const a = parser.feed('event: message_start\ndata: {"type":"message_st');
    expect(a).toHaveLength(0);
    const b = parser.feed('art","message":{}}\n\nevent: ping\ndata: {"type":"ping"}\n\n');
    expect(b.map((e) => e.type)).toEqual(["message_start", "ping"]);
  });

  it("ignores malformed data lines", () => {
    const parser = new SseParser();
    expect(parser.feed("data: not json\n\n")).toHaveLength(0);
  });
});
