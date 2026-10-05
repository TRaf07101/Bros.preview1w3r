import { randomBytes } from 'node:crypto';
import type { Config } from '../src/config.ts';
import { openDb } from '../src/db.ts';
import { SyncEngine } from '../src/sync/engine.ts';
import { linkTracker } from '../src/sync/link.ts';
import type { ProviderRegistry } from '../src/providers/registry.ts';
import { ProviderAuthError, type OdometerReading, type TrackerPoint, type TrackerPosition, type TrackerProvider, type TrackerTrip } from '../src/providers/types.ts';

export const testConfig = (over: Partial<Config> = {}): Config => ({
  port: 0, secretKey: randomBytes(32), allowedOrigins: ['https://app.example'], publicUrl: 'https://api.example', dbPath: ':memory:',
  pollIntervalMs: 120000, allowPrivateProviderHosts: true, cookieSecure: false, tripSettleMs: 120000, maxPlausibleKmh: 200, ...over,
});

/** Provedor controlado pelo teste: não inventa dados, só devolve o que o teste definir. */
export class ScriptedProvider implements TrackerProvider {
  info = { id: 'scripted', label: 'Scripted', fields: [], help: '' };
  odometer: OdometerReading | null = null;
  trips: TrackerTrip[] = [];
  points: TrackerPoint[] = [];
  position: TrackerPosition | null = null;
  failWith: Error | null = null;
  refreshed = 0;
  refresh: (() => Record<string, string> | null) | null = null;
  tokenOk = true;
  private guard() { if (this.failWith) throw this.failWith; if (!this.tokenOk) throw new ProviderAuthError('vencido'); }
  async connect() { return { credentials: { token: 'x' }, devices: [{ id: '7', name: 'Rastreador NXR' }] }; }
  async disconnect() {}
  async getDevice() { this.guard(); return { id: '7', name: 'Rastreador NXR' }; }
  async getCurrentPosition() { this.guard(); return this.position; }
  async getOdometer() { this.guard(); return this.odometer; }
  async getTrips() { this.guard(); return this.trips; }
  async getTripPoints() { this.guard(); return this.points; }
  async refreshCredentials() { this.refreshed++; if (!this.refresh) return null; const next = this.refresh(); if (next) this.tokenOk = true; return next; }
}

export const isoAt = (base: string, minutes: number) => new Date(Date.parse(base) + minutes * 60000).toISOString();

export async function setup(provider = new ScriptedProvider(), startKm = 10420, clock = { now: new Date('2026-10-04T10:00:00Z') }, over: Partial<Config> = {}) {
  const config = testConfig(over);
  const db = openDb(':memory:');
  db.prepare('INSERT INTO users (sid_hash, created_at) VALUES (?, ?)').run('h', clock.now.toISOString());
  const registry: ProviderRegistry = new Map([[provider.info.id, provider]]);
  const engine = new SyncEngine(db, config, registry, () => clock.now);
  const id = await linkTracker(db, config, { userId: 1, provider, credentials: { token: 'x' }, deviceId: '7', bikeKm: startKm, bikeLabel: 'NXR 160 Bros' }, clock.now);
  const events = () => db.prepare('SELECT * FROM sync_events ORDER BY id').all() as unknown as Array<Record<string, any>>;
  const conn = () => db.prepare('SELECT * FROM connections WHERE id = ?').get(id) as unknown as Record<string, any>;
  return { config, db, registry, engine, id, clock, provider, events, conn };
}
