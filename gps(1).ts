import type { TrackerPoint } from '../providers/types.ts';

export interface GpsDistanceOptions {
  /** Deslocamentos menores que isto entre pontos são ruído de GPS parado. */
  minStepMeters?: number;
  /** Velocidade implícita acima disso entre dois pontos é salto impossível. */
  maxSpeedKmh?: number;
  /** Intervalo maior que isto sem pontos é perda de sinal: o trecho não é contado. */
  maxGapSeconds?: number;
}

export interface GpsDistanceResult {
  meters: number;
  usedPoints: number;
  discarded: { duplicate: number; invalid: number; jump: number; gap: number; jitter: number };
  /** Dados bons o bastante para virar quilometragem. */
  reliable: boolean;
}

const R = 6371008.8;
const rad = (deg: number) => deg * Math.PI / 180;

export function haversineMeters(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }): number {
  const dLat = rad(b.latitude - a.latitude); const dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Distância percorrida a partir de pontos GPS, sem inventar quilômetros:
 * pontos inválidos, repetidos ou fora de ordem são ignorados; saltos
 * impossíveis e trechos sem sinal não entram na soma.
 */
export function gpsDistance(points: TrackerPoint[], options: GpsDistanceOptions = {}): GpsDistanceResult {
  const minStep = options.minStepMeters ?? 15;
  const maxSpeed = options.maxSpeedKmh ?? 200;
  const maxGap = options.maxGapSeconds ?? 600;
  const discarded = { duplicate: 0, invalid: 0, jump: 0, gap: 0, jitter: 0 };
  const clean: Array<TrackerPoint & { t: number }> = [];
  for (const point of points) {
    const t = Date.parse(point.at);
    const sane = point.valid && Number.isFinite(t) && Number.isFinite(point.latitude) && Number.isFinite(point.longitude)
      && Math.abs(point.latitude) <= 90 && Math.abs(point.longitude) <= 180 && !(point.latitude === 0 && point.longitude === 0);
    if (!sane) { discarded.invalid++; continue; }
    clean.push({ ...point, t });
  }
  clean.sort((a, b) => a.t - b.t);
  let meters = 0; let used = 0; let last: (typeof clean)[number] | null = null;
  for (const point of clean) {
    if (!last) { last = point; used = 1; continue; }
    const seconds = (point.t - last.t) / 1000;
    if (seconds <= 0) { discarded.duplicate++; continue; }
    const step = haversineMeters(last, point);
    if (seconds > maxGap) { discarded.gap++; last = point; continue; }
    if (step / seconds * 3.6 > maxSpeed) { discarded.jump++; continue; }
    if (step < minStep) { discarded.jitter++; continue; }
    meters += step; used++; last = point;
  }
  const lost = discarded.jump + discarded.gap;
  // Pouco material, ou muita coisa descartada: melhor pedir conferência do que chutar.
  const reliable = used >= 2 && lost <= Math.max(2, Math.floor(clean.length * 0.1));
  return { meters, usedPoints: used, discarded, reliable };
}
