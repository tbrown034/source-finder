/* The rate limiter is the cost fuse in front of the only paid call.
 * These tests pin its window and cap behavior; the per-instance reset
 * on cold start is a documented limitation, not a bug these tests hide. */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRateLimiter } from "./_shared.js";

describe("createRateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-11T08:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to the per-IP limit, then refuses", () => {
    const limiter = createRateLimiter({
      perIpLimit: 3,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 100,
    });
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
    expect(limiter.overQuota("1.2.3.4")).toBe(true);
  });

  it("counts IPs independently", () => {
    const limiter = createRateLimiter({
      perIpLimit: 1,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 100,
    });
    expect(limiter.overQuota("1.1.1.1")).toBe(false);
    expect(limiter.overQuota("2.2.2.2")).toBe(false);
    expect(limiter.overQuota("1.1.1.1")).toBe(true);
  });

  it("frees a slot when the window slides past old requests", () => {
    const limiter = createRateLimiter({
      perIpLimit: 1,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 100,
    });
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
    expect(limiter.overQuota("1.2.3.4")).toBe(true);
    vi.advanceTimersByTime(61 * 60 * 1000);
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
  });

  it("refuses everyone once the global daily cap is reached", () => {
    const limiter = createRateLimiter({
      perIpLimit: 100,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 2,
    });
    expect(limiter.overQuota("1.1.1.1")).toBe(false);
    expect(limiter.overQuota("2.2.2.2")).toBe(false);
    expect(limiter.overQuota("3.3.3.3")).toBe(true);
  });

  it("resets the global count on a new UTC day", () => {
    const limiter = createRateLimiter({
      perIpLimit: 100,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 1,
    });
    expect(limiter.overQuota("1.1.1.1")).toBe(false);
    expect(limiter.overQuota("2.2.2.2")).toBe(true);
    vi.setSystemTime(new Date("2026-08-12T00:00:01Z"));
    expect(limiter.overQuota("2.2.2.2")).toBe(false);
  });

  it("a refused request does not consume a slot for later", () => {
    const limiter = createRateLimiter({
      perIpLimit: 1,
      perIpWindowMs: 60 * 60 * 1000,
      globalDailyLimit: 100,
    });
    limiter.overQuota("1.2.3.4"); // uses the slot
    limiter.overQuota("1.2.3.4"); // refused
    vi.advanceTimersByTime(61 * 60 * 1000);
    // Only the accepted request occupied the window; refusals don't.
    expect(limiter.overQuota("1.2.3.4")).toBe(false);
  });
});
