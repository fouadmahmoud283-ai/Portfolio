import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/storage', () => ({
  saveResumeRequest: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendResumeRequestNotification: vi.fn(),
}));

vi.mock('@/lib/rateLimit', () => ({
  resumeRateLimiter: {
    check: vi.fn(),
  },
  getClientIp: vi.fn(),
}));

vi.mock('@/utils/resumeUtils', () => ({
  RESUME_FILENAME: 'test-resume.pdf',
  RESUME_PATH: '/test-resume.pdf',
}));

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    promises: {
      readFile: vi.fn(),
    },
  },
}));

import fs from 'node:fs';
import { saveResumeRequest } from '@/lib/storage';
import { sendResumeRequestNotification } from '@/lib/email';
import { resumeRateLimiter, getClientIp } from '@/lib/rateLimit';
import { GET, POST, OPTIONS } from '@/app/api/resume/route';

describe('Resume API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(resumeRateLimiter.check).mockReturnValue({
      allowed: true,
      remaining: 19,
      resetAt: Date.now() + 60000,
    });
    vi.mocked(getClientIp).mockReturnValue('1.2.3.4');
    vi.mocked(saveResumeRequest).mockResolvedValue({
      id: 'test-id',
      email: 'recruiter@example.com',
      purpose: 'recruiting',
      createdAt: '2024-01-01T00:00:00.000Z',
    });
    vi.mocked(sendResumeRequestNotification).mockResolvedValue(true);
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.promises.readFile).mockResolvedValue(Buffer.from('fake-pdf-content'));
  });

  describe('OPTIONS', () => {
    it('should return 204 with CORS headers allowing GET, POST, OPTIONS', async () => {
      const response = await OPTIONS();
      expect(response.status).toBe(204);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS');
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
    });
  });

  describe('POST', () => {
    it('should return 200 with { success: true, url } for valid email', async () => {
      const request = new Request('http://localhost/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'recruiter@example.com',
          purpose: 'recruiting',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.url).toBeDefined();
    });

    it('should call saveResumeRequest with the validated data', async () => {
      const request = new Request('http://localhost/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'recruiter@example.com',
          purpose: 'recruiting',
        }),
      });

      await POST(request);

      expect(saveResumeRequest).toHaveBeenCalledTimes(1);
      expect(saveResumeRequest).toHaveBeenCalledWith({
        email: 'recruiter@example.com',
        purpose: 'recruiting',
      });
    });

    it('should return 422 with errors.email for invalid email', async () => {
      const request = new Request('http://localhost/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'not-an-email',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(422);
      expect(data.errors).toBeDefined();
      expect(data.errors.email).toBeDefined();
    });

    it('should return 400 for invalid JSON', async () => {
      const request = new Request('http://localhost/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not valid json {{{',
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('should return 429 when rate limited', async () => {
      vi.mocked(resumeRateLimiter.check).mockReturnValue({
        allowed: false,
        remaining: 0,
        resetAt: Date.now() + 60000,
      });

      const request = new Request('http://localhost/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'recruiter@example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(response.headers.get('Retry-After')).toBeDefined();
      expect(data.success).toBe(false);
    });
  });

  describe('GET', () => {
    it('should return 404 when fs.existsSync returns false', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should return 200 with Content-Type application/pdf and Content-Disposition attachment when file exists', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.promises.readFile).mockResolvedValue(Buffer.from('fake-pdf-content'));

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/pdf');
      expect(response.headers.get('Content-Disposition')).toContain('attachment');
    });
  });
});


