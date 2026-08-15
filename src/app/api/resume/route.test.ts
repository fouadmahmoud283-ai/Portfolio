import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';

const TEST_DATA_DIR = path.join(os.tmpdir(), 'portfolio-resume-test-' + Date.now());

/*
 * storage.ts evaluates `const DATA_DIR = process.env.DATA_DIR || …` at module
 * load time.  A static `import { GET } from './route'` would trigger that
 * evaluation BEFORE beforeAll() runs, permanently binding DATA_DIR to the real
 * ./data directory.  Using a dynamic import after setting the env var (and
 * resetting the module registry) ensures storage.ts picks up TEST_DATA_DIR.
 */
let GET!: (request: Request) => Promise<Response>;

beforeAll(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  vi.resetModules();
  const mod = await import('./route');
  GET = mod.GET;
});

beforeEach(() => {
  fs.rmSync(path.join(TEST_DATA_DIR, 'stats.json'), { force: true });
});

afterAll(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe('GET /api/resume', () => {
  it('should return 200 and { downloads: 0, previews: 0 } for ?action=stats initially', async () => {
    const req = new Request('http://localhost/api/resume?action=stats', {
      method: 'GET',
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.downloads).toBe(0);
    expect(json.previews).toBe(0);
  });

  it('should return 200, application/pdf Content-Type, attachment Content-Disposition, and non-empty body for ?action=download', async () => {
    const req = new Request('http://localhost/api/resume?action=download', {
      method: 'GET',
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/pdf');
    expect(res.headers.get('Content-Disposition')).toContain('attachment');

    const body = Buffer.from(await res.arrayBuffer());
    expect(body.length).toBeGreaterThan(0);
  });

  it('should return 200 and Content-Disposition containing inline for ?action=preview', async () => {
    const req = new Request('http://localhost/api/resume?action=preview', {
      method: 'GET',
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Disposition')).toContain('inline');
  });

  it('should reflect downloads: 1 in stats after a download', async () => {
    const downloadReq = new Request('http://localhost/api/resume?action=download', {
      method: 'GET',
    });
    await GET(downloadReq);

    const statsReq = new Request('http://localhost/api/resume?action=stats', {
      method: 'GET',
    });

    const res = await GET(statsReq);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.downloads).toBe(1);
  });

  it('should return 400 when action query param is missing', async () => {
    const req = new Request('http://localhost/api/resume', {
      method: 'GET',
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });
});




