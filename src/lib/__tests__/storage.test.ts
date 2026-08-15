import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('fs', () => ({
  promises: {
    mkdir: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' })),
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
}));

import { promises as fs } from 'fs';
import {
  saveContactSubmission,
  getContactSubmissions,
  saveResumeRequest,
  getResumeRequests,
} from '@/lib/storage';

const enoentError = Object.assign(new Error('ENOENT'), { code: 'ENOENT' });

describe('saveContactSubmission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockRejectedValue(enoentError);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
  });

  it('should return an object with a UUID id and ISO createdAt string', async () => {
    const result = await saveContactSubmission({
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'This is a test message.',
    });

    expect(result.id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('should include the passed name, email, subject, message in the return', async () => {
    const result = await saveContactSubmission({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Hello World',
      message: 'This is a longer test message.',
    });

    expect(result.name).toBe('Jane Doe');
    expect(result.email).toBe('jane@example.com');
    expect(result.subject).toBe('Hello World');
    expect(result.message).toBe('This is a longer test message.');
  });

  it('should call writeFile with a JSON string containing the submission', async () => {
    await saveContactSubmission({
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'This is a test message.',
    });

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
    const writtenData = writeCall[1] as string;
    const parsed = JSON.parse(writtenData);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('John');
    expect(parsed[0].email).toBe('john@example.com');
  });

  it('should NOT throw even if the underlying write fails', async () => {
    vi.mocked(fs.writeFile).mockRejectedValue(new Error('Disk full'));

    const result = await saveContactSubmission({
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'This is a test message.',
    });

    expect(result).toBeDefined();
    expect(result.name).toBe('John');
  });
});

describe('getContactSubmissions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty array when the file is missing', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(enoentError);

    const result = await getContactSubmissions();
    expect(result).toEqual([]);
  });

  it('should return the parsed array when the file contains valid JSON', async () => {
    const data = [
      {
        id: 'test-id',
        name: 'John',
        email: 'john@example.com',
        subject: 'Test',
        message: 'Hello',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    ];
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(data));

    const result = await getContactSubmissions();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John');
  });

  it('should return an empty array when the file contains invalid JSON', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('not valid json {{{');

    const result = await getContactSubmissions();
    expect(result).toEqual([]);
  });
});

describe('saveResumeRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockRejectedValue(enoentError);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
  });

  it('should return an object with a UUID id and ISO createdAt string', async () => {
    const result = await saveResumeRequest({
      email: 'recruiter@example.com',
      purpose: 'recruiting',
    });

    expect(result.id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('should include the passed email and purpose in the return', async () => {
    const result = await saveResumeRequest({
      email: 'recruiter@example.com',
      purpose: 'recruiting',
    });

    expect(result.email).toBe('recruiter@example.com');
    expect(result.purpose).toBe('recruiting');
  });

  it('should call writeFile with a JSON string containing the request', async () => {
    await saveResumeRequest({
      email: 'recruiter@example.com',
      purpose: 'recruiting',
    });

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const writeCall = vi.mocked(fs.writeFile).mock.calls[0];
    const writtenData = writeCall[1] as string;
    const parsed = JSON.parse(writtenData);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].email).toBe('recruiter@example.com');
  });

  it('should NOT throw even if the underlying write fails', async () => {
    vi.mocked(fs.writeFile).mockRejectedValue(new Error('Disk full'));

    const result = await saveResumeRequest({
      email: 'recruiter@example.com',
      purpose: 'recruiting',
    });

    expect(result).toBeDefined();
    expect(result.email).toBe('recruiter@example.com');
  });
});

describe('getResumeRequests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty array when the file is missing', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(enoentError);

    const result = await getResumeRequests();
    expect(result).toEqual([]);
  });

  it('should return the parsed array when the file contains valid JSON', async () => {
    const data = [
      {
        id: 'test-id',
        email: 'recruiter@example.com',
        purpose: 'recruiting',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    ];
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(data));

    const result = await getResumeRequests();
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('recruiter@example.com');
  });

  it('should return an empty array when the file contains invalid JSON', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('not valid json {{{');

    const result = await getResumeRequests();
    expect(result).toEqual([]);
  });
});

