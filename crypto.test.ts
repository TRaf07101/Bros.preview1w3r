import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { test } from 'node:test';
import { open, seal } from '../src/crypto.ts';
import { haversineMeters, gpsDistance } from '../src/sync/gps.ts';

test('credenciais cifradas: não aparecem em texto claro e adulteração é detectada', () => {
  const key = randomBytes(32); const sealed = seal('{"token":"segredo123"}', key);
  assert.ok(!sealed.includes('segredo'));
  assert.equal(open(sealed, key), '{"token":"segredo123"}');
  assert.throws(() => open(sealed.slice(0, -2) + 'AA', key));
  assert.throws(() => open(sealed, randomBytes(32)));
});

test('haversine: 1 grau de latitude ≈ 111,2 km', () => {
  assert.ok(Math.abs(haversineMeters({ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 0 }) - 111195) < 100);
});

test('GPS: poucos pontos ou muito descartado não é confiável', () => {
  const one = gpsDistance([{ at: '2026-01-01T00:00:00Z', latitude: -23, longitude: -46, speedKmh: 0, valid: true }]);
  assert.equal(one.reliable, false);
  const gap = gpsDistance([
    { at: '2026-01-01T00:00:00Z', latitude: -23, longitude: -46, speedKmh: 0, valid: true },
    { at: '2026-01-01T01:00:00Z', latitude: -22.9, longitude: -46, speedKmh: 0, valid: true },
  ]);
  assert.equal(gap.meters, 0); assert.equal(gap.discarded.gap, 1); assert.equal(gap.reliable, false);
});
