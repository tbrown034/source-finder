import { describe, expect, it } from "vitest";
import {
  applyGroundingGate,
  collectSearchUrls,
  isWellFormed,
  normalizeUrl,
} from "./grounding.js";

const good = (overrides: Partial<Record<string, unknown>> = {}) => ({
  category: "data",
  who_or_what: "FEMA flood insurance claims data",
  why_needed: "Grounds the flooding history in checkable numbers",
  url: "https://www.fema.gov/openfema-data-page",
  source_title: "OpenFEMA Data Page",
  ...overrides,
});

const searchResponse = (urls: string[]) => [
  { type: "text", text: "Searching..." },
  { type: "server_tool_use", id: "srvtoolu_1", name: "web_search", input: {} },
  {
    type: "web_search_tool_result",
    tool_use_id: "srvtoolu_1",
    content: urls.map((url) => ({
      type: "web_search_result",
      url,
      title: "A result",
    })),
  },
];

describe("normalizeUrl — conservative URL identity", () => {
  it("treats trailing slash and no trailing slash as the same page", () => {
    expect(normalizeUrl("https://example.gov/data/")).toBe(
      normalizeUrl("https://example.gov/data"),
    );
  });

  it("treats http and https as the same page", () => {
    expect(normalizeUrl("http://example.gov/data")).toBe(
      normalizeUrl("https://example.gov/data"),
    );
  });

  it("ignores fragments", () => {
    expect(normalizeUrl("https://example.gov/data#section-2")).toBe(
      normalizeUrl("https://example.gov/data"),
    );
  });

  it("lowercases the host but preserves path case", () => {
    expect(normalizeUrl("https://Example.GOV/Data")).toBe("example.gov/Data");
  });

  it("keeps query strings distinct — a different query is a different page", () => {
    expect(normalizeUrl("https://example.gov/data?id=1")).not.toBe(
      normalizeUrl("https://example.gov/data?id=2"),
    );
  });

  it("rejects non-http(s) schemes", () => {
    expect(normalizeUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeUrl("ftp://example.gov/data")).toBeNull();
  });

  it("rejects URLs carrying credentials (user:pass@host spoofing)", () => {
    expect(normalizeUrl("https://user:pass@example.gov/data")).toBeNull();
    expect(normalizeUrl("https://evil.com%40@example.gov/data")).toBeNull();
  });

  it("rejects unparseable strings", () => {
    expect(normalizeUrl("not a url")).toBeNull();
    expect(normalizeUrl("")).toBeNull();
  });
});

describe("collectSearchUrls — only real search results count", () => {
  it("collects urls from web_search_tool_result blocks", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    expect(urls.has("www.fema.gov/openfema-data-page")).toBe(true);
  });

  it("ignores text blocks and tool_use blocks", () => {
    const urls = collectSearchUrls([
      { type: "text", text: "https://sneaky.example.com/in-prose" },
      { type: "server_tool_use", input: { query: "https://also.not/counted" } },
    ]);
    expect(urls.size).toBe(0);
  });

  it("survives an errored search (content is an object, not a list)", () => {
    const urls = collectSearchUrls([
      {
        type: "web_search_tool_result",
        tool_use_id: "x",
        content: { type: "web_search_tool_result_error", error_code: "max_uses_exceeded" },
      },
    ]);
    expect(urls.size).toBe(0);
  });

  it("returns empty for non-array input", () => {
    expect(collectSearchUrls(null).size).toBe(0);
    expect(collectSearchUrls("nope").size).toBe(0);
  });
});

describe("the grounding gate — no from-memory citations survive", () => {
  it("keeps a suggestion whose url appeared in search results", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    const result = applyGroundingGate([good()], urls);
    expect(result.kept).toHaveLength(1);
    expect(result.droppedCount).toBe(0);
  });

  it("drops a suggestion whose url never appeared in any search result", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.census.gov/data.html"]),
    );
    const result = applyGroundingGate([good()], urls);
    expect(result.kept).toHaveLength(0);
    expect(result.droppedCount).toBe(1);
  });

  it("drops everything when the search returned nothing", () => {
    const result = applyGroundingGate(
      [good(), good({ url: "https://plausible.org/report" })],
      new Set(),
    );
    expect(result.kept).toHaveLength(0);
    expect(result.droppedCount).toBe(2);
  });

  it("adversarial: an invented deep link on a real result's domain is dropped", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    const invented = good({
      url: "https://www.fema.gov/flood-claims/bayport-2026-report",
    });
    const result = applyGroundingGate([invented], urls);
    expect(result.kept).toHaveLength(0);
    expect(result.droppedCount).toBe(1);
  });

  it("adversarial: same page with an added query string is dropped", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    const result = applyGroundingGate(
      [good({ url: "https://www.fema.gov/openfema-data-page?claim=verified" })],
      urls,
    );
    expect(result.kept).toHaveLength(0);
  });

  it("accepts trailing-slash / scheme / fragment variants of a grounded url", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    for (
      const variant of [
        "https://www.fema.gov/openfema-data-page/",
        "http://www.fema.gov/openfema-data-page",
        "https://WWW.FEMA.GOV/openfema-data-page#top",
      ]
    ) {
      expect(applyGroundingGate([good({ url: variant })], urls).kept).toHaveLength(1);
    }
  });

  it("drops suggestions with missing or empty required fields", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    const cases = [
      good({ who_or_what: "" }),
      good({ why_needed: "   " }),
      good({ source_title: undefined }),
      good({ url: undefined }),
      { category: "data" },
      null,
      "just a string",
    ];
    const result = applyGroundingGate(cases, urls);
    expect(result.kept).toHaveLength(0);
    expect(result.droppedCount).toBe(cases.length);
  });

  it("drops suggestions with an unknown category", () => {
    const urls = collectSearchUrls(
      searchResponse(["https://www.fema.gov/openfema-data-page"]),
    );
    const result = applyGroundingGate(
      [good({ category: "miscellaneous" })],
      urls,
    );
    expect(result.kept).toHaveLength(0);
  });

  it("handles non-array model output without throwing", () => {
    expect(applyGroundingGate(null, new Set()).kept).toHaveLength(0);
    expect(applyGroundingGate({ suggestions: [] }, new Set()).kept).toHaveLength(0);
  });
});

describe("optional fields — contacts obey the same grounding rule", () => {
  const urls = () =>
    collectSearchUrls(
      searchResponse([
        "https://www.fema.gov/openfema-data-page",
        "https://www.fema.gov/about/contact",
      ]),
    );

  it("keeps a contact whose contact_url appeared in search results", () => {
    const s = good({
      contact: "Press office: 202-555-0100",
      contact_url: "https://www.fema.gov/about/contact",
    });
    const { kept } = applyGroundingGate([s], urls());
    expect(kept[0]?.contact).toBe("Press office: 202-555-0100");
    expect(kept[0]?.contact_url).toBe("https://www.fema.gov/about/contact");
  });

  it("strips a contact whose contact_url was never a search result — suggestion survives", () => {
    const s = good({
      contact: "Press office: 202-555-0100",
      contact_url: "https://www.fema.gov/invented/contact-page",
    });
    const { kept, droppedCount } = applyGroundingGate([s], urls());
    expect(kept).toHaveLength(1);
    expect(droppedCount).toBe(0);
    expect(kept[0]?.contact).toBeUndefined();
    expect(kept[0]?.contact_url).toBeUndefined();
  });

  it("strips a contact that has no contact_url at all", () => {
    const s = good({ contact: "call 713-555-0100" });
    const { kept } = applyGroundingGate([s], urls());
    expect(kept[0]?.contact).toBeUndefined();
  });

  it("passes why_good through and drops empty why_good", () => {
    const withWhy = good({ why_good: "Independent federal dataset" });
    const withEmpty = good({ why_good: "   " });
    const { kept } = applyGroundingGate([withWhy, withEmpty], urls());
    expect(kept[0]?.why_good).toBe("Independent federal dataset");
    expect(kept[1]?.why_good).toBeUndefined();
  });
});

describe("isWellFormed", () => {
  it("accepts a complete suggestion", () => {
    expect(isWellFormed(good())).toBe(true);
  });
  it("rejects extra-field-free but empty objects", () => {
    expect(isWellFormed({})).toBe(false);
  });
});
