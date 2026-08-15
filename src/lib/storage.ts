import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { ContactMessage, Subscriber, Project, ResumeAnalytics } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

/**
 * Read and parse a JSON file, returning `fallback` if the file does not
 * exist or is empty.  Any other read/parse error is re-thrown.
 */
export async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    if (raw.trim() === '') {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      return fallback;
    }
    throw err;
  }
}

/**
 * Write data as pretty-printed JSON, creating the parent directory if it
 * does not yet exist.
 */
export async function writeJson<T>(filePath: string, data: T): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json, 'utf-8');
}

/* ------------------------------------------------------------------ */
/*  Contact messages                                                   */
/* ------------------------------------------------------------------ */

export async function appendMessage(message: ContactMessage): Promise<void> {
  const messages = await getMessages();
  messages.push(message);
  await writeJson(MESSAGES_FILE, messages);
}

export async function getMessages(): Promise<ContactMessage[]> {
  return readJson<ContactMessage[]>(MESSAGES_FILE, []);
}

/* ------------------------------------------------------------------ */
/*  Newsletter subscribers                                            */
/* ------------------------------------------------------------------ */

export async function appendSubscriber(subscriber: Subscriber): Promise<void> {
  const subscribers = await getSubscribers();
  subscribers.push(subscriber);
  await writeJson(SUBSCRIBERS_FILE, subscribers);
}

export async function getSubscribers(): Promise<Subscriber[]> {
  return readJson<Subscriber[]>(SUBSCRIBERS_FILE, []);
}

/* ------------------------------------------------------------------ */
/*  Projects (seed data, read-only)                                   */
/* ------------------------------------------------------------------ */

export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>(PROJECTS_FILE, []);
}

/* ------------------------------------------------------------------ */
/*  Resume analytics                                                  */
/* ------------------------------------------------------------------ */

const DEFAULT_ANALYTICS: ResumeAnalytics = {
  downloadCount: 0,
  previewCount: 0,
  lastDownloadedAt: null,
};

export async function getResumeAnalytics(): Promise<ResumeAnalytics> {
  return readJson<ResumeAnalytics>(ANALYTICS_FILE, DEFAULT_ANALYTICS);
}

export async function incrementResumeDownload(): Promise<void> {
  const analytics = await getResumeAnalytics();
  analytics.downloadCount += 1;
  analytics.lastDownloadedAt = new Date().toISOString();
  await writeJson(ANALYTICS_FILE, analytics);
}

export async function incrementResumePreview(): Promise<void> {
  const analytics = await getResumeAnalytics();
  analytics.previewCount += 1;
  await writeJson(ANALYTICS_FILE, analytics);
}

/* ------------------------------------------------------------------ */
/*  ID helper (re-exported for route handlers)                        */
/* ------------------------------------------------------------------ */

export { randomUUID };

