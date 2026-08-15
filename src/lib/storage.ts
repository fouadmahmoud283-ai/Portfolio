import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ResumeRequest {
  id: string;
  email: string;
  purpose?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const RESUME_REQUESTS_FILE = path.join(DATA_DIR, 'resume-requests.json');

/**
 * Ensures the data directory exists. Safe to call multiple times.
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory likely already exists — ignore.
  }
}

/**
 * Reads a JSON array from disk. Returns an empty array if the file is
 * missing, unreadable, or contains invalid JSON.
 */
async function readJsonArray<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as T[];
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Writes a JSON array to disk. Creates the parent directory if needed.
 * Wraps errors so callers can decide how to handle them.
 */
async function writeJsonArray<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Public API — Contact submissions
// ---------------------------------------------------------------------------

/**
 * Persists a new contact form submission. Generates a UUID and timestamp
 * automatically. Handles concurrent writes gracefully via try/catch.
 */
export async function saveContactSubmission(
  data: Omit<ContactSubmission, 'id' | 'createdAt'>,
): Promise<ContactSubmission> {
  const submission: ContactSubmission = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = await readJsonArray<ContactSubmission>(CONTACTS_FILE);
    existing.push(submission);
    await writeJsonArray(CONTACTS_FILE, existing);
  } catch (error) {
    console.error('Failed to persist contact submission:', error);
  }

  return submission;
}

/**
 * Returns all stored contact submissions (newest last). Empty array on error.
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  return readJsonArray<ContactSubmission>(CONTACTS_FILE);
}

// ---------------------------------------------------------------------------
// Public API — Resume requests
// ---------------------------------------------------------------------------

/**
 * Persists a new resume download request. Generates a UUID and timestamp
 * automatically. Handles concurrent writes gracefully via try/catch.
 */
export async function saveResumeRequest(
  data: Omit<ResumeRequest, 'id' | 'createdAt'>,
): Promise<ResumeRequest> {
  const request: ResumeRequest = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = await readJsonArray<ResumeRequest>(RESUME_REQUESTS_FILE);
    existing.push(request);
    await writeJsonArray(RESUME_REQUESTS_FILE, existing);
  } catch (error) {
    console.error('Failed to persist resume request:', error);
  }

  return request;
}

/**
 * Returns all stored resume requests (newest last). Empty array on error.
 */
export async function getResumeRequests(): Promise<ResumeRequest[]> {
  return readJsonArray<ResumeRequest>(RESUME_REQUESTS_FILE);
}

