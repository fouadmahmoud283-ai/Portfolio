import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/storage', () => ({
  saveContactSubmission: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendContactNotification: vi.fn(),
}));

vi.mock('@/lib/rateLimit', () => ({
  contactRateLimiter: {
    check: vi.fn(),
  },
  getClientIp: vi.fn(),
}));

import { saveContactSubmission } from '@/lib/storage';
import { sendContactNotification } from '@/lib/email';
import { contactRateLimiter, getClientIp } from '@/lib/rateLimit';
import { POST, OPTIONS } from '@/app/api/contact/route';

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(contactRateLimiter.check).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    });
    vi.mocked(getClientIp).mockReturnValue('1.2.3.4');
    vi.mocked(saveContactSubmission).mockResolvedValue({
      id: 'test-id',
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Test message',
      createdAt: '2024-01-01T00:00:00.000Z',
    });
    vi.mocked(sendContactNotification).mockResolvedValue(true);
  });

  describe('OPTIONS', () => {
    it('should return 204 with CORS headers', async () => {
      const response = await OPTIONS();
      expect(response.status).toBe(204);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
    });
  });

  describe('POST', () => {
    const validBody = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a test message that is long enough.',
    };

    it('should return 200 with { success: true } for valid input', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validBody),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should call saveContactSubmission once with the validated data', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validBody),
      });

      await POST(request);

      expect(saveContactSubmission).toHaveBeenCalledTimes(1);
      expect(saveContactSubmission).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hello there',
        message: 'This is a test message that is long enough.',
      });
    });

    it('should return 422 with errors containing the name field for invalid input', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'A',
          email: 'john@example.com',
          subject: 'Hello there',
          message: 'This is a test message that is long enough.',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(422);
      expect(data.errors).toBeDefined();
      expect(data.errors.name).toBeDefined();
    });

    it('should return 200 fake-success and NOT call saveContactSubmission when honeypot is filled', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validBody,
          honeypot: 'spam-bot-caught',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(saveContactSubmission).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid JSON', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not valid json {{{',
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('should return 429 with Retry-After header when rate limited', async () => {
      vi.mocked(contactRateLimiter.check).mockReturnValue({
        allowed: false,
        remaining: 0,
        resetAt: Date.now() + 60000,
      });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validBody),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(response.headers.get('Retry-After')).toBeDefined();
      expect(data.success).toBe(false);
    });

    it('should still return 200 when saveContactSubmission throws', async () => {
      vi.mocked(saveContactSubmission).mockRejectedValueOnce(new Error('DB error'));

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validBody),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});


