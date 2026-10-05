/** Soma a distância de uma viagem a partir dos pontos de GPS do próprio celular. */
export interface Fix { lat: number; lon: number; t: number; acc: number }
export interface TripTrack { startedAt: number; meters: number; last: Fix | null; gaps: number; fixes: number }

const MAX_ACCURACY_M = 50;     // pontos menos precisos que isso são ignorados
const MAX_SPEED_MS = 70;       // ~250 km/h: acima disso é salto de GPS
const GAP_MS = 90_000;         // sem pontos por mais de 90 s = sinal perdido
const MIN_STEP_M = 8;          // movimentos menores são ruído do GPS parado
const GAP_MIN_DISTANCE_M = 300; // sem pontos E andou longe = trecho medido em linha reta

export const newTrack = (now: number): TripTrack => ({ startedAt: now, meters: 0, last: null, gaps: 0, fixes: 0 });

export function haversine(a: Pick<Fix, 'lat' | 'lon'>, b: Pick<Fix, 'lat' | 'lon'>): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad; const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371008.8 * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function addFix(track: TripTrack, fix: Fix): TripTrack {
  if (![fix.lat, fix.lon, fix.t].every(Number.isFinite) || Math.abs(fix.lat) > 90 || Math.abs(fix.lon) > 180) return track;
  if (!(fix.acc <= MAX_ACCURACY_M)) return track;
  const last = track.last;
  if (!last) return { ...track, last: fix, fixes: track.fixes + 1 };
  const dt = (fix.t - last.t) / 1000;
  if (!(dt > 0)) return track;
  const d = haversine(last, fix);
  if (d < Math.max(MIN_STEP_M, fix.acc / 2)) return track;
  if (d / dt > MAX_SPEED_MS) return track;
  return { ...track, meters: track.meters + d, last: fix, fixes: track.fixes + 1, gaps: track.gaps + (dt * 1000 > GAP_MS && d > GAP_MIN_DISTANCE_M ? 1 : 0) };
}

export function normalizeTrack(value: unknown): TripTrack | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Partial<TripTrack>;
  if (typeof raw.startedAt !== 'number' || !Number.isFinite(raw.startedAt) || typeof raw.meters !== 'number' || !(raw.meters >= 0)) return null;
  const last = raw.last && typeof raw.last === 'object' && [raw.last.lat, raw.last.lon, raw.last.t, raw.last.acc].every(Number.isFinite) ? raw.last : null;
  return { startedAt: raw.startedAt, meters: raw.meters, last, gaps: Number.isInteger(raw.gaps) && raw.gaps! >= 0 ? raw.gaps! : 0, fixes: Number.isInteger(raw.fixes) && raw.fixes! >= 0 ? raw.fixes! : 0 };
}
