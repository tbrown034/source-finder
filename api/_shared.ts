/* Shared server plumbing: rate limiting and client IP.
 *
 * The limiter is in-memory and per-instance — honest limitation: a cold
 * start resets it, and parallel instances don't share counts. For a demo
 * with a global daily cap this is acceptable; the cap is a cost fuse,
 * not a security boundary. The important property is fail-closed: if the
 * counting path throws, the caller returns 429 and no model call happens. */

import type { VercelRequest } from "@vercel/node";

export interface RateLimiter {
  overQuota(ip: string): boolean;
}

export function createRateLimiter(opts: {
  perIpLimit: number;
  perIpWindowMs: number;
  globalDailyLimit: number;
}): RateLimiter {
  const perIp = new Map<string, number[]>();
  let globalCount = 0;
  let globalDay = "";

  return {
    overQuota(ip: string): boolean {
      const now = Date.now();
      const today = new Date(now).toISOString().slice(0, 10);
      if (today !== globalDay) {
        globalDay = today;
        globalCount = 0;
      }
      if (globalCount >= opts.globalDailyLimit) return true;

      const cutoff = now - opts.perIpWindowMs;
      const stamps = (perIp.get(ip) ?? []).filter((t) => t > cutoff);
      if (stamps.length >= opts.perIpLimit) {
        perIp.set(ip, stamps);
        return true;
      }
      stamps.push(now);
      perIp.set(ip, stamps);
      globalCount++;
      return false;
    },
  };
}

export function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(",")[0]?.trim() || "unknown";
}

export const QUOTA_BODY = {
  error: "demo quota reached — the recorded sample still works",
} as const;
