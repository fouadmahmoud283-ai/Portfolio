import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock the storage module so no real file I/O happens
vi.mock('@/lib/storage', () => ({
  appendMessage: vi.fn(),
  getMessages: vi.fn(),
  randomUUID: vi.fn(() => 'test-uuid-123'),
}));

import { POST, GET } from '@/app/api/contact/route';
import { appendMessage, getMessages } from '@/lib/storage';
import type { ContactMessage } from '@/lib/types';

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello there',
  message: 'This is a valid message that is long enough.',
};

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 201 with success true and data when payload is valid', async () => {
    const request = createRequest(validPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data).toMatchObject({
      name: validPayload.name,
      email: validPayload.email,
      subject: validPayload.subject,
      message: validPayload.message,
      id: 'test-uuid-123',
      read: false,
    });
    expect(json.data.createdAt).toBeDefined();
    expect(appendMessage).toHaveBeenCalledOnce();
  });

  it('should return 400 with success false when name is missing', async () => {
    const { name: _unused, ...invalidPayload } = validPayload;
    void _unused;
    const request = createRequest(invalidPayload);
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBe('Validation failed');
    expect(appendMessage).not.toHaveBeenCalled();
  });

  it('should return 400 with success false when email is invalid', async () => {
    const request = createRequest({ ...validPayload, email: 'not-an-email' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(appendMessage).not.toHaveBeenCalled();
  });

  it('should return 400 with success false when message is too short', async () => {
    const request = createRequest({ ...validPayload, message: 'short' });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(appendMessage).not.toHaveBeenCalled();
  });
});

describe('GET /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 with success true and data as an array', async () => {
    const mockMessages: ContactMessage[] = [
      {
        id: 'msg-1',
        name: 'Alice',
        email: 'alice@example.com',
        subject: 'Subject 1',
        message: 'Message 1 content here',
        createdAt: '2024-01-01T00:00:00.000Z',
        read: false,
      },
    ];
    vi.mocked(getMessages).mockResolvedValue(mockMessages);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.data[0]).toMatchObject(mockMessages[0]);
  });

  it('should return 200 with empty array when no messages exist', async () => {
    vi.mocked(getMessages).mockResolvedValue([]);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual([]);
  });
});



