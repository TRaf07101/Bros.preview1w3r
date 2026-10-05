import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sid_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  creds_sealed TEXT NOT NULL,
  devices_json TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS connections (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  creds_sealed TEXT NOT NULL,
  device_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  bike_label TEXT NOT NULL,
  status TEXT NOT NULL,              -- connected | trip_in_progress | pending | error | reauth_required
  status_detail TEXT NOT NULL DEFAULT '',
  odometer_kind TEXT,                -- hardware | accumulated | null (somente viagens)
  last_odo_m REAL,                   -- último valor do odômetro do provedor já considerado
  bike_km_synced REAL NOT NULL,      -- quilometragem da moto segundo o rastreador (decimal)
  linked_at TEXT NOT NULL,
  last_sync_at TEXT,
  last_attempt_at TEXT,
  next_attempt_at TEXT,
  fail_count INTEGER NOT NULL DEFAULT 0,
  webhook_secret TEXT NOT NULL,
  seq_counter INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  connection_id TEXT NOT NULL REFERENCES connections(id) ON DELETE CASCADE,
  provider_trip_id TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  distance_m REAL,
  odo_start_m REAL,
  odo_end_m REAL,
  counted INTEGER NOT NULL DEFAULT 0,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  UNIQUE (connection_id, provider_trip_id)
);
CREATE TABLE IF NOT EXISTS sync_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  connection_id TEXT NOT NULL REFERENCES connections(id) ON DELETE CASCADE,
  deliver_seq INTEGER,               -- ordem de entrega ao app; só existe quando status = ready/applied
  status TEXT NOT NULL,              -- ready | applied | pending | discarded
  reason TEXT NOT NULL DEFAULT '',
  data_source TEXT NOT NULL,         -- hardware | accumulated | trips
  trip_ids_json TEXT NOT NULL,
  trip_start TEXT,
  trip_end TEXT,
  distance_m REAL NOT NULL,
  km_before REAL NOT NULL,
  km_after REAL NOT NULL,
  odo_before_m REAL,
  odo_after_m REAL,
  synced_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS sync_events_by_conn ON sync_events (connection_id, id);
`;

export type Db = DatabaseSync;

export function openDb(path: string): Db {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(SCHEMA);
  return db;
}

/** Executa fn dentro de uma transação; reverte se lançar. */
export function transaction<T>(db: Db, fn: () => T): T {
  db.exec('BEGIN IMMEDIATE');
  try { const result = fn(); db.exec('COMMIT'); return result; }
  catch (error) { db.exec('ROLLBACK'); throw error; }
}
