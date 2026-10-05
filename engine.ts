import type { Config } from '../config.ts';
import { open, seal } from '../crypto.ts';
import { transaction, type Db } from '../db.ts';
import type { ProviderRegistry } from '../providers/registry.ts';
import {
  ProviderAuthError, ProviderDataError, ProviderUnavailableError,
  type OdometerReading, type ProviderCredentials, type ProviderSession, type TrackerDevice, type TrackerPosition, type TrackerProvider, type TrackerTrip,
} from '../providers/types.ts';
import { gpsDistance } from './gps.ts';

export type ConnectionStatus = 'connected' | 'trip_in_progress' | 'pending' | 'error' | 'reauth_required';

export interface ConnectionRow {
  id: string; user_id: number; provider: string; creds_sealed: string; device_id: string; device_name: string; bike_label: string;
  status: ConnectionStatus; status_detail: string; odometer_kind: 'hardware' | 'accumulated' | null; last_odo_m: number | null;
  bike_km_synced: number; linked_at: string; last_sync_at: string | null; last_attempt_at: string | null; next_attempt_at: string | null;
  fail_count: number; webhook_secret: string; seq_counter: number;
}

export type TripCounted = 0 | 1 | 2 | 3; // 0 a contar · 1 contada · 2 ignorada · 3 em conferência

export type SyncOutcome =
  | { outcome: 'synced'; eventId: number; distanceKm: number }
  | { outcome: 'pending'; eventId: number; reason: string }
  | { outcome: 'pending_confirmation' }
  | { outcome: 'no_change' | 'trip_in_progress' | 'busy' | 'gone' }
  | { outcome: 'error' | 'reauth_required'; message: string };

export const MIN_EVENT_METERS = 100;
const LOOKBACK_MS = 45 * 24 * 3600 * 1000;
const FRESH_POSITION_MS = 10 * 60 * 1000;
const MAX_TRIP_POINT_LOOKUPS = 15;

interface Gathered {
  device: TrackerDevice;
  position: TrackerPosition | null;
  odometer: OdometerReading | null;
  trips: Array<TrackerTrip & { gpsMeters?: number | null }>;
}

export class SyncEngine {
  private running = new Set<string>();
  private db: Db; private config: Config; private registry: ProviderRegistry; private now: () => Date;
  constructor(db: Db, config: Config, registry: ProviderRegistry, now: () => Date = () => new Date()) {
    this.db = db; this.config = config; this.registry = registry; this.now = now;
  }

  private conn(id: string): ConnectionRow | undefined {
    return this.db.prepare('SELECT * FROM connections WHERE id = ?').get(id) as unknown as ConnectionRow | undefined;
  }
  private provider(row: ConnectionRow): TrackerProvider {
    const provider = this.registry.get(row.provider);
    if (!provider) throw new ProviderDataError(`Provedor desconhecido: ${row.provider}.`);
    return provider;
  }
  sessionOf(row: ConnectionRow): ProviderSession {
    return { credentials: JSON.parse(open(row.creds_sealed, this.config.secretKey)) as ProviderCredentials, deviceId: row.device_id };
  }

  async sync(connectionId: string): Promise<SyncOutcome> {
    if (this.running.has(connectionId)) return { outcome: 'busy' };
    this.running.add(connectionId);
    try { return await this.run(connectionId); }
    finally { this.running.delete(connectionId); }
  }

  private async run(id: string): Promise<SyncOutcome> {
    const row = this.conn(id);
    if (!row) return { outcome: 'gone' };
    const now = this.now();
    this.db.prepare('UPDATE connections SET last_attempt_at = ? WHERE id = ?').run(now.toISOString(), id);
    try {
      let gathered: Gathered;
      try { gathered = await this.gather(row, now); }
      catch (error) {
        // Token vencido: provedores com renovação (OAuth) tentam uma vez antes de pedir nova conexão.
        const provider = this.provider(row);
        if (!(error instanceof ProviderAuthError) || !provider.refreshCredentials) throw error;
        const refreshed = await provider.refreshCredentials(this.sessionOf(row)).catch(() => null);
        if (!refreshed) throw error;
        this.db.prepare('UPDATE connections SET creds_sealed = ? WHERE id = ?').run(seal(JSON.stringify(refreshed), this.config.secretKey), id);
        gathered = await this.gather(this.conn(id)!, now);
      }
      return gathered.position && this.isMoving(gathered.position, now)
        ? this.markPhase(id, 'trip_in_progress', now)
        : transaction(this.db, () => this.apply(id, gathered, now));
    } catch (error) {
      return this.fail(id, error, now);
    }
  }

  private isMoving(position: TrackerPosition, now: Date) {
    return position.moving === true && now.getTime() - Date.parse(position.at) < FRESH_POSITION_MS;
  }

  private async gather(row: ConnectionRow, now: Date): Promise<Gathered> {
    const provider = this.provider(row);
    const session = this.sessionOf(row);
    const device = await provider.getDevice(session);
    const position = await provider.getCurrentPosition(session);
    if (position && this.isMoving(position, now)) return { device, position, odometer: null, trips: [] };
    const odometer = await provider.getOdometer(session);
    const from = new Date(Math.max(Date.parse(row.linked_at), now.getTime() - LOOKBACK_MS));
    const trips: Gathered['trips'] = await provider.getTrips(session, from, now);
    // Viagens sem distância nem odômetro: calcula pelos pontos GPS, com proteção contra ruído.
    let lookups = 0;
    for (const trip of trips) {
      const hasOdo = trip.startOdometerMeters !== null && trip.endOdometerMeters !== null;
      if (trip.distanceMeters !== null || hasOdo || !provider.getTripPoints || lookups >= MAX_TRIP_POINT_LOOKUPS) continue;
      if (Date.parse(trip.startTime) < Date.parse(row.linked_at) || this.alreadyStored(row.id, trip.id)) continue;
      lookups++;
      const points = await provider.getTripPoints(session, new Date(trip.startTime), new Date(trip.endTime));
      const result = gpsDistance(points, { maxSpeedKmh: this.config.maxPlausibleKmh });
      trip.gpsMeters = result.reliable ? result.meters : null;
    }
    return { device, position, odometer, trips };
  }

  private alreadyStored(connectionId: string, tripId: string): boolean {
    return Boolean(this.db.prepare('SELECT 1 FROM trips WHERE connection_id = ? AND provider_trip_id = ?').get(connectionId, tripId));
  }

  private markPhase(id: string, status: ConnectionStatus, now: Date, detail = ''): SyncOutcome {
    const next = new Date(now.getTime() + (status === 'trip_in_progress' ? 60000 : this.config.pollIntervalMs)).toISOString();
    this.db.prepare('UPDATE connections SET status = ?, status_detail = ?, next_attempt_at = ?, fail_count = 0 WHERE id = ?').run(status, detail, next, id);
    return status === 'trip_in_progress' ? { outcome: 'trip_in_progress' } : { outcome: 'pending_confirmation' };
  }

  private apply(id: string, data: Gathered, now: Date): SyncOutcome {
    const row = this.conn(id);
    if (!row) return { outcome: 'gone' };
    const iso = now.toISOString();
    const settleLimit = now.getTime() - this.config.tripSettleMs;
    const nextAt = new Date(now.getTime() + this.config.pollIntervalMs).toISOString();

    // Uma conferência pendente bloqueia novos eventos: evita contar duas vezes a mesma distância.
    const pendingExists = this.db.prepare("SELECT 1 FROM sync_events WHERE connection_id = ? AND status = 'pending'").get(id);
    if (pendingExists) {
      this.db.prepare("UPDATE connections SET status = 'pending', status_detail = ?, last_attempt_at = ?, next_attempt_at = ?, fail_count = 0 WHERE id = ?")
        .run('Há uma atualização aguardando a sua conferência.', iso, nextAt, id);
      return { outcome: 'pending_confirmation' };
    }

    // Viagem terminou há pouco: espera assentar (o rastreador pode estender ou dividir).
    const settling = data.trips.some(trip => Date.parse(trip.startTime) >= Date.parse(row.linked_at) && Date.parse(trip.endTime) > settleLimit && !this.alreadyStored(id, trip.id));
    if (settling) {
      this.db.prepare("UPDATE connections SET status = 'trip_in_progress', status_detail = '', next_attempt_at = ?, fail_count = 0 WHERE id = ?").run(new Date(now.getTime() + this.config.tripSettleMs).toISOString(), id);
      return { outcome: 'trip_in_progress' };
    }

    const odometer = data.odometer;
    const useOdometer = odometer !== null && row.last_odo_m !== null;
    const dataSource: 'hardware' | 'accumulated' | 'trips' = useOdometer ? odometer!.kind : 'trips';

    // 1) Registra viagens novas (idempotente pelo id do provedor; sobreposição = mesma viagem dividida).
    const inserted: Array<{ rowId: number; tripId: string; start: string; end: string; meters: number | null; implausible: boolean }> = [];
    const stored = this.db.prepare('SELECT start_time, end_time FROM trips WHERE connection_id = ?').all(id) as unknown as Array<{ start_time: string; end_time: string }>;
    for (const trip of [...data.trips].sort((a, b) => a.startTime.localeCompare(b.startTime))) {
      if (Date.parse(trip.startTime) < Date.parse(row.linked_at)) continue;
      if (this.alreadyStored(id, trip.id)) continue;
      const overlaps = stored.some(item => item.start_time < trip.endTime && item.end_time > trip.startTime);
      const hasOdoPair = trip.startOdometerMeters !== null && trip.endOdometerMeters !== null;
      const fromOdo = hasOdoPair ? trip.endOdometerMeters! - trip.startOdometerMeters! : null;
      const meters = fromOdo !== null && fromOdo >= 0 ? fromOdo : trip.distanceMeters ?? trip.gpsMeters ?? null;
      const hours = Math.max(1 / 3600, (Date.parse(trip.endTime) - Date.parse(trip.startTime)) / 3.6e6);
      const implausible = meters !== null && (meters < 0 || meters / 1000 / hours > this.config.maxPlausibleKmh);
      const result = this.db.prepare('INSERT INTO trips (connection_id, provider_trip_id, start_time, end_time, distance_m, odo_start_m, odo_end_m, counted, note, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
        .run(id, trip.id, trip.startTime, trip.endTime, meters, trip.startOdometerMeters, trip.endOdometerMeters, overlaps ? 2 : 0, overlaps ? 'Sobreposta a uma viagem já registrada; não somada.' : '', iso);
      stored.push({ start_time: trip.startTime, end_time: trip.endTime });
      if (!overlaps) inserted.push({ rowId: Number(result.lastInsertRowid), tripId: trip.id, start: trip.startTime, end: trip.endTime, meters, implausible });
    }
    const setTrips = (ids: number[], counted: TripCounted) => { for (const rowId of ids) this.db.prepare('UPDATE trips SET counted = ? WHERE id = ?').run(counted, rowId); };

    // 2) Distância desta sincronização.
    let deltaM = 0; let problem = ''; const tripRowIds = inserted.map(item => item.rowId);
    if (useOdometer) {
      deltaM = odometer!.meters - row.last_odo_m!;
      if (deltaM < 0) problem = 'odometer_decreased';
    } else {
      const unknown = inserted.some(item => item.meters === null);
      deltaM = inserted.reduce((sum, item) => sum + (item.meters ?? 0), 0);
      // Viagens contadas só uma vez: as que ficaram abaixo do mínimo em sincronizações anteriores entram agora.
      const carried = this.db.prepare('SELECT COALESCE(SUM(distance_m),0) AS m FROM trips WHERE connection_id = ? AND counted = 0 AND distance_m IS NOT NULL').get(id) as unknown as { m: number };
      const carriedIds = (this.db.prepare('SELECT id FROM trips WHERE connection_id = ? AND counted = 0').all(id) as unknown as Array<{ id: number }>).map(item => item.id);
      deltaM = carried.m; for (const rowId of carriedIds) if (!tripRowIds.includes(rowId)) tripRowIds.push(rowId);
      if (unknown) problem = 'insufficient_data';
    }
    if (!problem && inserted.some(item => item.implausible)) problem = 'implausible_distance';
    if (!problem) {
      const sinceMs = now.getTime() - Date.parse(row.last_sync_at || row.linked_at);
      const maxKm = Math.max(0, sinceMs) / 3.6e6 * this.config.maxPlausibleKmh + 1;
      if (deltaM / 1000 > maxKm) problem = 'implausible_distance';
    }

    // 3) Sem movimento relevante: nada a contar. O odômetro só avança quando vira evento.
    if (!problem && deltaM < MIN_EVENT_METERS) {
      if (useOdometer) setTrips(inserted.map(item => item.rowId), 1);
      this.db.prepare("UPDATE connections SET status = 'connected', status_detail = '', last_sync_at = ?, next_attempt_at = ?, fail_count = 0, odometer_kind = COALESCE(?, odometer_kind) WHERE id = ?").run(iso, nextAt, odometer?.kind ?? null, id);
      return { outcome: 'no_change' };
    }

    const kmBefore = row.bike_km_synced;
    const kmAfter = problem ? kmBefore : kmBefore + deltaM / 1000;
    const tripIds = [...inserted.map(item => item.tripId)];
    const starts = inserted.map(item => item.start).sort(); const ends = inserted.map(item => item.end).sort();
    const odoAfter = odometer && useOdometer ? odometer.meters : null;
    const insertEvent = (status: 'ready' | 'pending', seq: number | null, reason: string) => Number(this.db.prepare(
      'INSERT INTO sync_events (connection_id, deliver_seq, status, reason, data_source, trip_ids_json, trip_start, trip_end, distance_m, km_before, km_after, odo_before_m, odo_after_m, synced_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .run(id, seq, status, reason, dataSource, JSON.stringify(tripIds), starts[0] ?? null, ends[ends.length - 1] ?? null, problem === 'insufficient_data' || problem === 'odometer_decreased' ? 0 : deltaM, kmBefore, problem ? kmBefore + (problem === 'implausible_distance' ? deltaM / 1000 : 0) : kmAfter, useOdometer ? row.last_odo_m : null, odoAfter, iso).lastInsertRowid);

    if (problem) {
      const eventId = insertEvent('pending', null, problem);
      setTrips(tripRowIds, 3);
      this.db.prepare("UPDATE connections SET status = 'pending', status_detail = ?, last_sync_at = ?, next_attempt_at = ?, fail_count = 0 WHERE id = ?").run(PENDING_MESSAGES[problem], iso, nextAt, id);
      return { outcome: 'pending', eventId, reason: problem };
    }
    const seq = row.seq_counter + 1;
    const eventId = insertEvent('ready', seq, '');
    setTrips(tripRowIds, 1);
    this.db.prepare("UPDATE connections SET status = 'connected', status_detail = '', bike_km_synced = ?, seq_counter = ?, last_odo_m = ?, odometer_kind = COALESCE(?, odometer_kind), last_sync_at = ?, next_attempt_at = ?, fail_count = 0 WHERE id = ?")
      .run(kmAfter, seq, useOdometer ? odometer!.meters : (odometer?.meters ?? null), odometer?.kind ?? null, iso, nextAt, id);
    return { outcome: 'synced', eventId, distanceKm: deltaM / 1000 };
  }

  private fail(id: string, error: unknown, now: Date): SyncOutcome {
    const row = this.conn(id);
    if (!row) return { outcome: 'gone' };
    if (error instanceof ProviderAuthError) {
      this.db.prepare("UPDATE connections SET status = 'reauth_required', status_detail = ?, next_attempt_at = NULL WHERE id = ?").run('Reconecte o rastreador: o acesso foi recusado ou venceu.', id);
      return { outcome: 'reauth_required', message: error.message };
    }
    const message = error instanceof ProviderUnavailableError || error instanceof ProviderDataError ? error.message : 'Falha inesperada ao sincronizar.';
    const fails = row.fail_count + 1;
    const wait = Math.min(this.config.pollIntervalMs * 2 ** Math.min(fails, 6), 3600000);
    this.db.prepare("UPDATE connections SET status = 'error', status_detail = ?, fail_count = ?, next_attempt_at = ? WHERE id = ?").run(message, fails, new Date(now.getTime() + wait).toISOString(), id);
    return { outcome: 'error', message };
  }

  /** Resolve uma atualização pendente. 'apply' só vale quando há distância confiável a aplicar. */
  resolvePending(connectionId: string, eventId: number, action: 'apply' | 'discard'): { ok: true } | { ok: false; message: string } {
    return transaction(this.db, () => {
      const row = this.conn(connectionId);
      const event = this.db.prepare("SELECT * FROM sync_events WHERE id = ? AND connection_id = ? AND status = 'pending'").get(eventId, connectionId) as unknown as { id: number; reason: string; distance_m: number; km_before: number; odo_after_m: number | null; trip_ids_json: string } | undefined;
      if (!row || !event) return { ok: false as const, message: 'Essa atualização não está mais pendente.' };
      const tripRows = (JSON.parse(event.trip_ids_json) as string[]);
      const markTrips = (counted: TripCounted) => { for (const tripId of tripRows) this.db.prepare('UPDATE trips SET counted = ? WHERE connection_id = ? AND provider_trip_id = ?').run(counted, connectionId, tripId); };
      const reanchor = event.odo_after_m !== null ? event.odo_after_m : row.last_odo_m;
      if (action === 'apply') {
        if (event.reason === 'odometer_decreased' || event.reason === 'insufficient_data' || event.distance_m <= 0) return { ok: false as const, message: 'Esses dados não têm uma distância confiável para aplicar. Descarte e continue a partir de agora.' };
        const seq = row.seq_counter + 1;
        const kmAfter = row.bike_km_synced + event.distance_m / 1000;
        this.db.prepare("UPDATE sync_events SET status = 'ready', deliver_seq = ?, km_before = ?, km_after = ?, reason = reason || ';confirmed' WHERE id = ?").run(seq, row.bike_km_synced, kmAfter, event.id);
        markTrips(1);
        this.db.prepare("UPDATE connections SET bike_km_synced = ?, seq_counter = ?, last_odo_m = ?, status = 'connected', status_detail = '' WHERE id = ?").run(kmAfter, seq, reanchor, connectionId);
      } else {
        this.db.prepare("UPDATE sync_events SET status = 'discarded', reason = reason || ';discarded' WHERE id = ?").run(event.id);
        markTrips(2);
        this.db.prepare("UPDATE connections SET last_odo_m = ?, status = 'connected', status_detail = '' WHERE id = ?").run(reanchor, connectionId);
      }
      return { ok: true as const };
    });
  }
}

const PENDING_MESSAGES: Record<string, string> = {
  odometer_decreased: 'O contador do rastreador diminuiu. Pode ter sido trocado ou zerado.',
  insufficient_data: 'Os dados da viagem não bastam para calcular a distância com segurança.',
  implausible_distance: 'A distância informada parece alta demais para o tempo decorrido.',
};
