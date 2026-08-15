import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

function ensureDataDir(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpPath, filePath);
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  ip?: string;
}

export function addMessage(input: Omit<Message, 'id' | 'createdAt'>): Message {
  const message: Message = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const messages = readJson<Message[]>('messages.json', []);
  messages.push(message);
  writeJson('messages.json', messages);

  return message;
}

export function getMessages(): Message[] {
  const messages = readJson<Message[]>('messages.json', []);
  return messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ---------------------------------------------------------------------------
// Resume stats
// ---------------------------------------------------------------------------

export interface ResumeStats {
  downloads: number;
  previews: number;
  lastDownloadedAt?: string;
  lastPreviewedAt?: string;
}

export function getStats(): ResumeStats {
  return readJson<ResumeStats>('stats.json', { downloads: 0, previews: 0 });
}

export function incrementDownloads(): void {
  const stats = getStats();
  stats.downloads += 1;
  stats.lastDownloadedAt = new Date().toISOString();
  writeJson('stats.json', stats);
}

export function incrementPreviews(): void {
  const stats = getStats();
  stats.previews += 1;
  stats.lastPreviewedAt = new Date().toISOString();
  writeJson('stats.json', stats);
}

