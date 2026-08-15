import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RateLimiter, getClientIp } from '@/lib/rateLimit';

describe('RateLimiter', () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    limiter = new RateLimiter(3, 1000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow 3 requests then block the 4th', () => {
    const r1 = limiter.check('key1');
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = limiter.check('key1');
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = limiter.check('key1');
    expect(r3.allowed).toBe(true);
    expect(r3.remaining).toBe(0);

    const r4 = limiter.check('key1');
    expect(r4.allowed).toBe(false);
    expect(r4.remaining).toBe(0);
  });

  it('should decrement remaining correctly per allowed request', () => {
    const r1 = limiter.check('key1');
    expect(r1.remaining).toBe(2);

    const r2 = limiter.check('key1');
    expect(r2.remaining).toBe(1);

    const r3 = limiter.check('key1');
    expect(r3.remaining).toBe(0);
  });

  it('should reset after the window elapses', () => {
    vi.useFakeTimers();
    const now = Date.now();
    vi.setSystemTime(now);

    limiter.check('key1');
    limiter.check('key1');
    limiter.check('key1');

    const blocked = limiter.check('key1');
    expect(blocked.allowed).toBe(false);

    vi.advanceTimersByTime(1001);

    const after = limiter.check('key1');
    expect(after.allowed).toBe(true);
    expect(after.remaining).toBe(2);
  });

  it('should maintain independent counters for different keys', () => {
    limiter.check('key1');
    limiter.check('key1');
    limiter.check('key1');

    const blocked = limiter.check('key1');
    expect(blocked.allowed).toBe(false);

    const r = limiter.check('key2');
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(2);
  });
});

describe('getClientIp', () => {
  it('should read x-forwarded-for header (first IP when comma-separated)', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(getClientIp(request)).toBe('1.2.3.4');
  });

  it('should read x-forwarded-for header for a single IP', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    expect(getClientIp(request)).toBe('1.2.3.4');
  });

  it('should fall back to x-real-ip when x-forwarded-for is absent', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '9.8.7.6' },
    });
    expect(getClientIp(request)).toBe('9.8.7.6');
  });

  it('should return "unknown" when neither header is present', () => {
    const request = new Request('http://localhost');
    expect(getClientIp(request)).toBe('unknown');
  });
});

