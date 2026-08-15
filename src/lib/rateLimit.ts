// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

// ---------------------------------------------------------------------------
// RateLimiter
// ---------------------------------------------------------------------------

/**
 * Simple in-memory rate limiter. Tracks request counts per key within a
 * sliding window. Not suitable for multi-instance deployments without an
 * external store (e.g. Redis), but perfect for single-server Next.js.
 */
export class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly store = new Map<string, RateLimitEntry>();

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Checks whether a request from the given key (typically an IP address)
   * is allowed under the current rate limit. Increments the counter if so.
   *
   * Also prunes expired entries to prevent unbounded memory growth.
   */
  check(key: string): RateLimitResult {
    const now = Date.now();

    // Prune expired entries periodically
    this.prune(now);

    const entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      // First request or window expired — start fresh
      const resetAt = now + this.windowMs;
      this.store.set(key, { count: 1, resetAt });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt,
      };
    }

    if (entry.count >= this.maxRequests) {
      // Limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
      };
    }

    // Within limits — increment
    entry.count += 1;
    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }

  /**
   * Removes expired entries from the store to prevent memory leaks.
   */
  private prune(now: number): void {
    for (const [key, entry] of this.store) {
      if (now >= entry.resetAt) {
        this.store.delete(key);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

/** 5 contact form submissions per minute per IP. */
export const contactRateLimiter = new RateLimiter(5, 60_000);

/** 20 resume downloads per minute per IP. */
export const resumeRateLimiter = new RateLimiter(20, 60_000);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts the client IP address from a standard Web Request object.
 * Checks `x-forwarded-for` (first IP in the list) then `x-real-ip`,
 * falling back to 'unknown'.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

