import { describe, expect, it, vi } from "vitest";
import { applyGroundingGate } from "./grounding.js";
import {
  OPENAI_FALLBACK_MODEL,
  parseOpenAiFallbackResponse,
  runOpenAiFallback,
} from "./openai-fallback.js";

const suggestion = {
  category: "data",
  who_or_what: "City budget records",
  why_needed: "The draft does not verify the spending claim.",
  url: "https://example.gov/budget",
  source_title: "City budget",
};

function completedPayload() {
  return {
    status: "completed",
    model: OPENAI_FALLBACK_MODEL,
    output: [
      {
        type: "web_search_call",
        status: "completed",
        action: {
          type: "search",
          queries: ["Houston city budget"],
          sources: [
            {
              type: "url",
              url: "https://example.gov/budget",
              title: "City budget",
            },
            {
              type: "url",
              url: "https://example.org/context",
              title: "Independent context",
            },
          ],
        },
      },
      {
        type: "message",
        status: "completed",
        content: [
          {
            type: "output_text",
            text: JSON.stringify([suggestion]),
            annotations: [
              {
                type: "url_citation",
                url: "https://example.gov/budget",
                title: "City budget",
              },
            ],
          },
        ],
      },
    ],
    usage: { input_tokens: 100, output_tokens: 40, total_tokens: 140 },
  };
}

describe("parseOpenAiFallbackResponse", () => {
  it("returns parsed suggestions and the complete canonical source list", () => {
    const result = parseOpenAiFallbackResponse(completedPayload());
    expect(result.provider).toBe("openai");
    expect(result.suggestions).toEqual([suggestion]);
    expect(result.searchResults).toEqual([
      { url: "https://example.gov/budget", title: "City budget" },
      { url: "https://example.org/context", title: "Independent context" },
    ]);
    expect(result.searchUrls).toEqual(
      new Set(["example.gov/budget", "example.org/context"]),
    );
    expect(result.searchesRun).toBe(1);
    expect(result.usage).toEqual({
      inputTokens: 100,
      outputTokens: 40,
      totalTokens: 140,
    });
    expect(
      applyGroundingGate(result.suggestions, result.searchUrls).kept,
    ).toEqual([suggestion]);
  });

  it("can use official URL citation annotations as a defensive fallback", () => {
    const payload = completedPayload();
    const search = payload.output[0];
    if (search && "action" in search && search.action) search.action.sources = [];
    const result = parseOpenAiFallbackResponse(payload);
    expect(result.searchResults).toEqual([
      { url: "https://example.gov/budget", title: "City budget" },
    ]);
  });

  it("fails closed when no searched URL evidence is present", () => {
    const payload = completedPayload();
    const search = payload.output[0];
    const message = payload.output[1];
    if (search && "action" in search && search.action) search.action.sources = [];
    if (message && "content" in message && message.content?.[0]) {
      message.content[0].annotations = [];
    }
    expect(() => parseOpenAiFallbackResponse(payload)).toThrowError(
      "OpenAI web search returned no usable source URLs",
    );
  });
});

describe("runOpenAiFallback", () => {
  it("uses raw Responses API fetch with web search and included sources", async () => {
    const fetchImpl = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      new Response(JSON.stringify(completedPayload()), {
        status: 200,
        headers: { "content-type": "application/json" },
      }));

    await runOpenAiFallback({
      apiKey: "test-key",
      text: "A sufficiently detailed Houston story draft for a unit test.",
      isIdea: false,
      fetchImpl: fetchImpl as typeof fetch,
    });

    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0] ?? [];
    expect(url).toBe("https://api.openai.com/v1/responses");
    expect(init?.headers).toMatchObject({ authorization: "Bearer test-key" });
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(body).toMatchObject({
      model: OPENAI_FALLBACK_MODEL,
      tools: [{ type: "web_search", search_context_size: "medium" }],
      tool_choice: "required",
      include: ["web_search_call.action.sources"],
      max_tool_calls: 5,
      reasoning: { effort: "low" },
      store: false,
    });
  });

  it("reports upstream status without exposing provider response bodies", async () => {
    const fetchImpl = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
      new Response('{"error":{"message":"secret detail"}}', { status: 529 }));
    await expect(
      runOpenAiFallback({
        apiKey: "test-key",
        text: "A sufficiently detailed story draft.",
        isIdea: false,
        fetchImpl: fetchImpl as typeof fetch,
      }),
    ).rejects.toMatchObject({
      kind: "upstream",
      status: 529,
      message: "OpenAI fallback returned HTTP 529",
    });
  });
});
