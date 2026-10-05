import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ProviderAuthError, ProviderUnavailableError } from '../src/providers/types.ts';
import { ScriptedProvider, isoAt, setup } from './helpers.ts';

const T0 = '2026-10-04T10:00:00Z';
const advance = (ctx: Awaited<ReturnType<typeof setup>>, minutes: number) => { ctx.clock.now = new Date(ctx.clock.now.getTime() + minutes * 60000); };
const trip = (id: string, startMin: number, endMin: number, extra: Record<string, unknown> = {}) => ({ id, startTime: isoAt(T0, startMin), endTime: isoAt(T0, endMin), distanceMeters: null, startOdometerMeters: null, endOdometerMeters: null, averageSpeedKmh: null, ...extra });

test('odômetro de hardware: 10.420,0 + viagem de 18,7 km = 10.438,7 km', async () => {
  const p = new ScriptedProvider(); p.odometer = { meters: 55_000_000, kind: 'hardware', at: T0 };
  const ctx = await setup(p);
  assert.equal(ctx.conn().last_odo_m, 55_000_000);
  advance(ctx, 90); // viagem de 10:10 a 10:40, sync às 11:30
  p.odometer = { meters: 55_018_700, kind: 'hardware', at: isoAt(T0, 40) };
  p.trips = [trip('a', 10, 40, { startOdometerMeters: 55_000_000, endOdometerMeters: 55_018_700 })];
  const out = await ctx.engine.sync(ctx.id);
  assert.equal(out.outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10438.7) < 1e-6);
  const [event] = ctx.events();
  assert.equal(event.status, 'ready'); assert.equal(event.data_source, 'hardware'); assert.equal(event.deliver_seq, 1);
  assert.equal(event.odo_before_m, 55_000_000); assert.equal(event.odo_after_m, 55_018_700);
  assert.equal(event.km_before, 10420);
});

test('repetir a mesma viagem não soma duas vezes (com e sem odômetro)', async () => {
  const p = new ScriptedProvider(); p.odometer = { meters: 1_000_000, kind: 'hardware', at: T0 };
  const ctx = await setup(p);
  advance(ctx, 90);
  p.odometer = { meters: 1_018_700, kind: 'hardware', at: T0 };
  p.trips = [trip('a', 10, 40, { distanceMeters: 18_700 })];
  await ctx.engine.sync(ctx.id); await ctx.engine.sync(ctx.id); advance(ctx, 5); await ctx.engine.sync(ctx.id);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10438.7) < 1e-6);
  assert.equal(ctx.events().length, 1);
  // Mesma viagem reenviada com outro formato de relógio: o id é o mesmo, continua não contando.
  p.odometer = null;
  await ctx.engine.sync(ctx.id);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10438.7) < 1e-6);
});

test('somente viagens (sem odômetro): soma a distância informada e ignora repetição', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40, { distanceMeters: 18_700 })];
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10438.7) < 1e-6);
  assert.equal(ctx.events()[0].data_source, 'trips');
  await ctx.engine.sync(ctx.id);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10438.7) < 1e-6);
});

test('viagens antes da conexão não entram (não inventa histórico)', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 600);
  p.trips = [trip('old', -300, -250, { distanceMeters: 30_000 })];
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'no_change');
  assert.equal(ctx.conn().bike_km_synced, 10420);
});

test('viagem que acabou de terminar espera assentar; em movimento não conta', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 30);
  p.position = { at: ctx.clock.now.toISOString(), latitude: -23, longitude: -46, speedKmh: 55, moving: true };
  p.trips = [trip('a', 10, 29, { distanceMeters: 8000 })];
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'trip_in_progress');
  assert.equal(ctx.conn().bike_km_synced, 10420);
  p.position = { at: ctx.clock.now.toISOString(), latitude: -23, longitude: -46, speedKmh: 0, moving: false };
  p.trips = [trip('a', 10, 30, { distanceMeters: 8000 })]; // terminou agora
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'trip_in_progress');
  advance(ctx, 3);
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10428) < 1e-6);
});

test('trechos divididos que se sobrepõem não contam duas vezes', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 120);
  p.trips = [trip('a', 10, 40, { distanceMeters: 10_000 })];
  await ctx.engine.sync(ctx.id);
  p.trips = [trip('a', 10, 40, { distanceMeters: 10_000 }), trip('a2', 20, 50, { distanceMeters: 10_000 })];
  advance(ctx, 5);
  await ctx.engine.sync(ctx.id);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10430) < 1e-6);
});

test('dados insuficientes: fica pendente e a quilometragem não muda', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40)]; p.points = []; // sem distância, sem odômetro, sem pontos
  const out = await ctx.engine.sync(ctx.id);
  assert.equal(out.outcome, 'pending');
  assert.equal(ctx.conn().bike_km_synced, 10420);
  assert.equal(ctx.conn().status, 'pending');
  assert.equal(ctx.events()[0].status, 'pending');
  // não pode ser aplicado: não há distância
  const resolved = ctx.engine.resolvePending(ctx.id, ctx.events()[0].id, 'apply');
  assert.equal(resolved.ok, false);
  assert.equal(ctx.engine.resolvePending(ctx.id, ctx.events()[0].id, 'discard').ok, true);
  assert.equal(ctx.conn().bike_km_synced, 10420);
});

test('viagem sem distância usa os pontos GPS com proteção contra saltos e ruído', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40)];
  // ~11,1 km ao norte em 6 pontos, com ponto duplicado, jitter, salto absurdo e ponto inválido
  const at = (m: number) => isoAt(T0, 10 + m);
  const lat = (km: number) => -23 + km / 111.195;
  p.points = [
    { at: at(0), latitude: lat(0), longitude: -46, speedKmh: 0, valid: true },
    { at: at(0), latitude: lat(0), longitude: -46, speedKmh: 0, valid: true },
    { at: at(5), latitude: lat(2.2), longitude: -46, speedKmh: 40, valid: true },
    { at: at(5.1), latitude: lat(2.2) + 0.00001, longitude: -46, speedKmh: 0, valid: true },
    { at: at(8), latitude: lat(300), longitude: -46, speedKmh: 40, valid: true },
    { at: at(10), latitude: lat(4.4), longitude: -46, speedKmh: 40, valid: false },
    { at: at(15), latitude: lat(6.6), longitude: -46, speedKmh: 40, valid: true },
    { at: at(20), latitude: lat(8.8), longitude: -46, speedKmh: 40, valid: true },
    { at: at(25), latitude: lat(11.1), longitude: -46, speedKmh: 40, valid: true },
  ];
  const out = await ctx.engine.sync(ctx.id);
  assert.equal(out.outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10420 - 11.1) < 0.1, `somou ${ctx.conn().bike_km_synced - 10420}`);
});

test('odômetro diminuiu: pendente, nada é somado e a âncora só muda ao descartar', async () => {
  const p = new ScriptedProvider(); p.odometer = { meters: 5_000_000, kind: 'hardware', at: T0 };
  const ctx = await setup(p);
  advance(ctx, 90);
  p.odometer = { meters: 100_000, kind: 'hardware', at: T0 };
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'pending');
  assert.equal(ctx.conn().bike_km_synced, 10420);
  assert.equal(ctx.conn().last_odo_m, 5_000_000);
  advance(ctx, 5);
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'pending_confirmation');
  ctx.engine.resolvePending(ctx.id, ctx.events()[0].id, 'discard');
  assert.equal(ctx.conn().last_odo_m, 100_000);
  advance(ctx, 60);
  p.odometer = { meters: 112_500, kind: 'hardware', at: T0 };
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10432.5) < 1e-6);
});

test('distância impossível para o tempo decorrido vai para conferência', async () => {
  const p = new ScriptedProvider(); p.odometer = { meters: 0, kind: 'hardware', at: T0 };
  const ctx = await setup(p);
  advance(ctx, 30);
  p.odometer = { meters: 900_000, kind: 'hardware', at: T0 }; // 900 km em 30 min
  const out = await ctx.engine.sync(ctx.id);
  assert.equal(out.outcome, 'pending');
  assert.equal(ctx.conn().bike_km_synced, 10420);
  assert.equal(ctx.events()[0].reason, 'implausible_distance');
});

test('perda de conexão: erro temporário, recuo exponencial, recupera sem perder viagem', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40, { distanceMeters: 5000 })];
  p.failWith = new ProviderUnavailableError('sem rede');
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'error');
  assert.equal(ctx.conn().status, 'error'); assert.equal(ctx.conn().fail_count, 1);
  assert.equal(ctx.conn().bike_km_synced, 10420);
  p.failWith = null; advance(ctx, 5);
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'synced');
  assert.equal(ctx.conn().status, 'connected'); assert.equal(ctx.conn().fail_count, 0);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10425) < 1e-6);
});

test('token expirado sem renovação: pede nova conexão e para de consultar', async () => {
  const p = new ScriptedProvider(); p.tokenOk = false;
  const ctx = await setup(p).catch(e => e);
  // linkTracker já falha com token vencido: o app mostra erro e não cria conexão.
  assert.ok(ctx instanceof ProviderAuthError || ctx instanceof Error);
  const q = new ScriptedProvider();
  const c2 = await setup(q);
  q.tokenOk = false; advance(c2, 90);
  assert.equal((await c2.engine.sync(c2.id)).outcome, 'reauth_required');
  assert.equal(c2.conn().status, 'reauth_required'); assert.equal(c2.conn().next_attempt_at, null);
});

test('token expirado com renovação: renova uma vez e sincroniza', async () => {
  const q = new ScriptedProvider();
  const c = await setup(q);
  q.tokenOk = false; q.refresh = () => ({ token: 'novo' }); advance(c, 90);
  q.trips = [trip('a', 10, 40, { distanceMeters: 4000 })];
  assert.equal((await c.engine.sync(c.id)).outcome, 'synced');
  assert.equal(q.refreshed, 1);
  assert.ok(c.conn().creds_sealed.startsWith('v1.'));
  assert.ok(!c.conn().creds_sealed.includes('novo'));
});

test('ausência de dados: sem viagens nem odômetro, nada muda', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'no_change');
  assert.equal(ctx.events().length, 0); assert.equal(ctx.conn().bike_km_synced, 10420);
});

test('dados inválidos do provedor viram erro, não quilômetros', async () => {
  const p = new ScriptedProvider(); p.odometer = { meters: 0, kind: 'hardware', at: T0 };
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40, { distanceMeters: -5000 })]; p.odometer = null;
  const out = await ctx.engine.sync(ctx.id);
  assert.equal(out.outcome, 'pending');
  assert.equal(ctx.conn().bike_km_synced, 10420);
});

test('sincronizações simultâneas da mesma conexão não duplicam', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 40, { distanceMeters: 6000 })];
  const results = await Promise.all([ctx.engine.sync(ctx.id), ctx.engine.sync(ctx.id), ctx.engine.sync(ctx.id)]);
  assert.equal(results.filter(r => r.outcome === 'synced').length, 1);
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10426) < 1e-6);
});

test('movimentos menores que 100 m não geram atualização, mas acumulam até valer', async () => {
  const p = new ScriptedProvider();
  const ctx = await setup(p);
  advance(ctx, 90);
  p.trips = [trip('a', 10, 12, { distanceMeters: 60 })];
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'no_change');
  advance(ctx, 30);
  p.trips = [trip('a', 10, 12, { distanceMeters: 60 }), trip('b', 60, 62, { distanceMeters: 70 })];
  assert.equal((await ctx.engine.sync(ctx.id)).outcome, 'synced');
  assert.ok(Math.abs(ctx.conn().bike_km_synced - 10420.13) < 1e-6);
});
