import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { POST, GET } from './route';
import fs from 'fs';
import path from 'path';
import os from 'os';

const TEST_DATA_DIR = path.join(os.tmpdir(), 'portfolio-contact-test-' + Date.now());
const ORIGINAL_ADMIN_TOKEN = process.env.ADMIN_TOKEN;

beforeAll(() => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  process.env.ADMIN_TOKEN = 'test-admin-token';
});

afterAll(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_ADMIN_TOKEN !== undefined) {
    process.env.ADMIN_TOKEN = ORIGINAL_ADMIN_TOKEN;
  } else {
    delete process.env.ADMIN_TOKEN;
  }
});

describe('POST /api/contact', () => {
  it('should return 201 and { success: true, id } when body is valid', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Hello there',
        message: 'This is a test message that is long enough.',
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.id).toBeDefined();
    expect(typeof json.id).toBe('string');
  });

  it('should return 400 when required fields are missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it('should return 400 when email is invalid', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'not-an-email',
        subject: 'Hello there',
        message: 'This is a test message that is long enough.',
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });
});

describe('GET /api/contact', () => {
  it('should return 401 when Authorization header is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'GET',
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toBeDefined();
  });

  it('should return 200 and include previously created message when authenticated', async () => {
    // First, create a message to look for
    const postReq = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Hello there',
        message: 'This is a test message that is long enough.',
      }),
    });
    const postRes = await POST(postReq);
    const postJson = await postRes.json();
    const createdId = postJson.id;

    // Now fetch with auth
    const req = new Request('http://localhost/api/contact', {
      method: 'GET',
      headers: { Authorization: 'Bearer test-admin-token' },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(json.messages)).toBe(true);
    expect(json.messages.some((m: { id: string }) => m.id === createdId)).toBe(true);
  });
});

