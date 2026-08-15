import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock the storage module so no real file I/O happens
vi.mock('@/lib/storage', () => ({
  appendSubscriber: vi.fn(),
  getSubscribers: vi.fn(),
  randomUUID: vi.fn(() => 'test-uuid-456'),
}));

import { POST } from '@/app/api/subscribe/route';
import { appendSubscriber, getSubscribers } from '@/lib/storage';
import type { Subscriber } from '@/lib/types';

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 201 with success true when email is new', async () => {
    vi.mocked(getSubscribers).mockResolvedValue([]);

    const request = createRequest({ email: 'newuser@example.com' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data).toMatchObject({
      email: 'newuser@example.com',
      id: 'test-uuid-456',
      source: 'footer',
    });
    expect(json.data.subscribedAt).toBeDefined();
    expect(appendSubscriber).toHaveBeenCalledOnce();
  });

  it('should return 200 with "Already subscribed" when email already exists', async () => {
    const existingSubscriber: Subscriber = {
      id: 'existing-id',
      email: 'existing@example.com',
      subscribedAt: '2024-01-01T00:00:00.000Z',
      source: 'footer',
    };
    vi.mocked(getSubscribers).mockResolvedValue([existingSubscriber]);

    const request = createRequest({ email: 'existing@example.com' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toContain('Already subscribed');
    expect(json.data).toMatchObject(existingSubscriber);
    expect(appendSubscriber).not.toHaveBeenCalled();
  });

  it('should detect duplicate email case-insensitively', async () => {
    const existingSubscriber: Subscriber = {
      id: 'existing-id',
      email: 'User@Example.com',
      subscribedAt: '2024-01-01T00:00:00.000Z',
      source: 'footer',
    };
    vi.mocked(getSubscribers).mockResolvedValue([existingSubscriber]);

    const request = createRequest({ email: 'user@example.com' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.message).toContain('Already subscribed');
    expect(appendSubscriber).not.toHaveBeenCalled();
  });

  it('should return 400 when email is invalid', async () => {
    const request = createRequest({ email: 'not-an-email' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBe('Validation failed');
    expect(appendSubscriber).not.toHaveBeenCalled();
  });

  it('should accept a source field and include it in the subscriber', async () => {
    vi.mocked(getSubscribers).mockResolvedValue([]);

    const request = createRequest({ email: 'newuser@example.com', source: 'hero' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.data.source).toBe('hero');
  });
});


