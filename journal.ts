import type { DeliveryJournal, NoticeEvent } from './types';

const KEY = 'bros-notification-journal-v1';
let memory: DeliveryJournal = { delivered: {}, events: [] };

export function readJournal(): DeliveryJournal {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return memory;
    const delivered: Record<string, string> = {};
    if (parsed.delivered && typeof parsed.delivered === 'object') {
      for (const [key, value] of Object.entries(parsed.delivered)) {
        if (typeof value === 'string' && Number.isFinite(Date.parse(value))) delivered[key] = value;
      }
    }
    const events: NoticeEvent[] = Array.isArray(parsed.events) ? parsed.events.filter((event: NoticeEvent) => event && typeof event.id === 'string' && typeof event.title === 'string' && typeof event.message === 'string' && Number.isFinite(Date.parse(event.at)) && ['requested', 'opened', 'error', 'test'].includes(event.status)).slice(-60) : [];
    memory = { delivered, events };
    return memory;
  } catch { return memory; }
}

function writeJournal(journal: DeliveryJournal) {
  const keys = Object.entries(journal.delivered).sort((a, b) => a[1].localeCompare(b[1])).slice(-300);
  memory = { delivered: Object.fromEntries(keys), events: journal.events.slice(-60) };
  try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch { /* In-memory deduplication still protects the current session. */ }
  window.dispatchEvent(new Event('bros-notification-journal'));
}

export function logNotice(status: NoticeEvent['status'], title: string, message: string, keys: string[] = []) {
  const journal = readJournal();
  const at = new Date().toISOString();
  for (const key of keys) journal.delivered[key] = at;
  const event: NoticeEvent = { id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, at, title, status, message };
  writeJournal({ delivered: journal.delivered, events: [...journal.events, event] });
}

export function clearNotificationJournal() { memory = { delivered: {}, events: [] }; try { localStorage.removeItem(KEY); } catch { /* The app may be running without persistent storage. */ } window.dispatchEvent(new Event('bros-notification-journal')); }

export async function withNotificationLock(task: () => Promise<void>) {
  if ('locks' in navigator) {
    await navigator.locks.request('bros-notification-delivery', { ifAvailable: true }, async lock => { if (lock) await task(); });
  } else await task();
}