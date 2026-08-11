import { EventEmitter } from "node:events";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "./find-sources.js";

const suggestion = {
  category: "data",
  who_or_what: "City budget records",
  why_needed: "The draft needs a checkable public record.",
  url: "https://example.gov/budget",
  source_title: "City budget",
};

class MockRequest extends EventEmitter {
  method = "POST";
  body = {
    text: "A sufficiently detailed Houston story draft for endpoint testing.",
    mode: "draft",
  };
  headers: Record<string, string>;

  constructor(ip: string) {
    super();
    this.headers = { "x-real-ip": ip };
  }
}

class MockResponse extends EventEmitter {
  statusCode = 200;
  writableEnded = false;
  headers = new Map<string, string>();
  chunks: string[] = [];
  jsonBody: unknown;

  setHeader(name: string, value: string): this {
    this.headers.set(name.toLowerCase(), value);
    return this;
  }

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  json(body: unknown): this {
    this.jsonBody = body;
    this.writableEnded = true;
    return this;
  }

  write(chunk: string): boolean {
    this.chunks.push(chunk);
    return true;
  }

  end(): this {
    this.writableEnded = true;
    this.emit("finish");
    return this;
  }

  lines(): Array<Record<string, unknown>> {
    return this.chunks
      .join("")
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Record<string, unknown>);
  }
}

function sseResponse(): Response {
  const events = [
    { type: "message_start", message: { usage: { input_tokens: 100 } } },
    {
      type: "content_block_start",
      index: 0,
      content_block: {
        type: "server_tool_use",
        id: "search-1",
        name: "web_search",
        input: {},
      },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "input_json_delta", partial_json: '{"query":"budget"}' },
    },
    { type: "content_block_stop", index: 0 },
    {
      type: "content_block_start",
      index: 1,
      content_block: {
        type: "web_search_tool_result",
        tool_use_id: "search-1",
        content: [
          {
            type: "web_search_result",
            url: suggestion.url,
            title: suggestion.source_title,
          },
        ],
      },
    },
    {
      type: "content_block_start",
      index: 2,
      content_block: { type: "text", text: "" },
    },
    {
      type: "content_block_delta",
      index: 2,
      delta: { type: "text_delta", text: JSON.stringify([suggestion]) },
    },
    { type: "content_block_stop", index: 2 },
    { type: "message_delta", usage: { output_tokens: 40 } },
  ];
  const body = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
  return new Response(body, { status: 200 });
}

function openAiResponse(): Response {
  return new Response(JSON.stringify({
    status: "completed",
    model: "gpt-5.6-terra",
    output: [
      {
        type: "web_search_call",
        action: {
          type: "search",
          sources: [{ url: suggestion.url, title: suggestion.source_title }],
        },
      },
      {
        type: "message",
        content: [{
          type: "output_text",
          text: JSON.stringify([suggestion]),
          annotations: [],
        }],
      },
    ],
    usage: { input_tokens: 100, output_tokens: 40, total_tokens: 140 },
  }), { status: 200 });
}

function request(ip: string): VercelRequest {
  return new MockRequest(ip) as unknown as VercelRequest;
}

function response(): MockResponse & VercelResponse {
  return new MockResponse() as MockResponse & VercelResponse;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.OPENAI_API_KEY;
});

describe("POST /api/find-sources", () => {
  it("does not call OpenAI after a grounded Anthropic success", async () => {
    process.env.ANTHROPIC_API_KEY = "anthropic-test";
    process.env.OPENAI_API_KEY = "openai-test";
    const fetchMock = vi.fn(async (_input: RequestInfo | URL) => sseResponse());
    vi.stubGlobal("fetch", fetchMock);
    const res = response();

    await handler(request("test-primary"), res);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("anthropic.com");
    const done = res.lines().find((line) => line.t === "done");
    expect(done).toMatchObject({
      provider: "anthropic",
      model: "claude-sonnet-5",
      dropped_count: 0,
      searches_run: 1,
    });
    expect(done?.estimated_cost_usd).toBeTypeOf("number");
  });

  it("calls OpenAI exactly once after Anthropic fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.ANTHROPIC_API_KEY = "anthropic-test";
    process.env.OPENAI_API_KEY = "openai-test";
    const fetchMock = vi.fn(async (input: RequestInfo | URL) =>
      String(input).includes("anthropic.com")
        ? new Response("", { status: 529 })
        : openAiResponse());
    vi.stubGlobal("fetch", fetchMock);
    const res = response();

    await handler(request("test-fallback"), res);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain("api.openai.com");
    expect(res.lines()).toContainEqual(expect.objectContaining({
      t: "progress",
      kind: "fallback_started",
    }));
    expect(res.lines().find((line) => line.t === "done")).toMatchObject({
      provider: "openai",
      model: "gpt-5.6-terra",
      dropped_count: 0,
      searches_run: 1,
    });
  });

  it("returns one safe streamed error when both providers fail", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.ANTHROPIC_API_KEY = "anthropic-test";
    process.env.OPENAI_API_KEY = "openai-test";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 529 })));
    const res = response();

    await handler(request("test-both-fail"), res);

    expect(res.lines().at(-1)).toMatchObject({
      t: "error",
      error: "source providers are unavailable right now — try again in a moment",
    });
  });
});
