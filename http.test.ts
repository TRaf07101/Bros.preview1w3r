import assert from 'node:assert/strict';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { after, test } from 'node:test';
import { createApp } from '../src/app.ts';
import { openDb } from '../src/db.ts';
import { createTraccarProvider } from '../src/providers/traccar.ts';
import { SyncEngine } from '../src/sync/engine.ts';
import { testConfig } from './helpers.ts';

/**
 * Servidor de teste que imita os endpoints REST documentados do Traccar
 * (/api/devices, /api/positions, /api/reports/trips). É só uma ferramenta
 * de teste: o app em produção fala com o servidor Traccar real do usuário.
 */
const fake = { token: 'token-valido-123', odometer: 55_000_000 as number | null, trips: [] as unknown[], moving: false, fail: 0 };
const traccar: Server = createServer((req, res) => {
  const url = new URL(req.url!, 'http://x');
  if (req.headers.authorization !== `Bearer ${fake.token}`) { res.writeHead(401).end(); return; }
  if (fake.fail > 0) { fake.fail--; res.writeHead(503).end(); return; }
  res.setHeader('Content-Type', 'application/json');
  if (url.pathname === '/api/devices') return void res.end(JSON.stringify([{ id: 7, name: 'NXR 160', uniqueId: 'abc', status: 'online', lastUpdate: new Date().toISOString() }]));
  if (url.pathname === '/api/positions') return void res.end(JSON.stringify([{ id: 1, deviceId: 7, fixTime: new Date().toISOString(), latitude: -23.5, longitude: -46.6, speed: fake.moving ? 30 : 0, valid: true, attributes: { ...(fake.odometer === null ? {} : { odometer: fake.odometer }), motion: fake.moving } }]));
  if (url.pathname === '/api/reports/trips') return void res.end(JSON.stringify(fake.trips));
  res.writeHead(404).end();
});
await new Promise<void>(r => traccar.listen(0, '127.0.0.1', r));
const traccarUrl = `http://127.0.0.1:${(traccar.address() as AddressInfo).port}`;

const clock = { now: new Date() };
const config = testConfig();
const db = openDb(':memory:');
const registry = new Map([['traccar', createTraccarProvider({ allowPrivateHosts: true })]]);
const engine = new SyncEngine(db, config, registry, () => clock.now);
const api = createApp({ config, db, registry, engine, now: () => clock.now });
await new Promise<void>(r => api.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${(api.address() as AddressInfo).port}`;
after(() => { api.close(); traccar.close(); });

let cookie = '';
async function call(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(base + path, { method, headers: { Origin: 'https://app.example', 'X-Bros-Client': '1', 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}), ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
  const set = res.headers.get('set-cookie'); if (set) cookie = set.split(';')[0];
  const text = await res.text();
  return { status: res.status, json: text ? JSON.parse(text) : null, headers: res.headers };
}

test('2/3: autenticação e obtenção da motocicleta pelo adaptador do Traccar via HTTP', async () => {
  const bad = await call('POST', '/api/tracker/discover', { provider: 'traccar', fields: { serverUrl: traccarUrl, token: 'errado-errado' } });
  assert.equal(bad.status, 401);
  const ok = await call('POST', '/api/tracker/discover', { provider: 'traccar', fields: { serverUrl: traccarUrl, token: fake.token } });
  assert.equal(ok.status, 200);
  assert.equal(ok.json.devices[0].name, 'NXR 160');
  assert.ok(!JSON.stringify(ok.json).includes(fake.token), 'o token nunca volta para o navegador');
  assert.match(ok.headers.get('set-cookie')!, /HttpOnly/);
});

test('1/4/6: conectar, ler odômetro e sincronizar uma viagem', async () => {
  const discover = await call('POST', '/api/tracker/discover', { provider: 'traccar', fields: { serverUrl: traccarUrl, token: fake.token } });
  const connected = await call('POST', '/api/tracker/connect', { draftId: discover.json.draftId, deviceId: '7', bikeKm: 10420, bikeLabel: 'NXR 160 Bros' });
  assert.equal(connected.status, 200);
  assert.equal(connected.json.connection.odometerKind, 'hardware');
  assert.equal(connected.json.connection.syncedKm, 10420);
  assert.ok(!JSON.stringify(connected.json).includes(fake.token));
  assert.equal(connected.json.events.length, 0);

  // 90 min depois: viagem de 18,7 km registrada pelo odômetro do rastreador
  clock.now = new Date(clock.now.getTime() + 90 * 60000);
  const start = new Date(clock.now.getTime() - 80 * 60000).toISOString(); const end = new Date(clock.now.getTime() - 50 * 60000).toISOString();
  fake.odometer = 55_018_700;
  fake.trips = [{ deviceId: 7, startTime: start, endTime: end, distance: 18700, startOdometer: 55_000_000, endOdometer: 55_018_700, averageSpeed: 20 }];
  const synced = await call('POST', '/api/tracker/sync');
  assert.equal(synced.status, 200);
  assert.equal(synced.json.events.length, 1);
  assert.equal(synced.json.events[0].distanceMeters, 18700);
  assert.equal(synced.json.events[0].kmAfter, 10438.7);
  assert.equal(synced.json.events[0].seq, 1);
  assert.equal(synced.json.connection.syncedKm, 10438.7);

  // repetir a mesma viagem e pedir sincronização de novo: nada novo
  const again = await call('POST', '/api/tracker/sync');
  assert.equal(again.json.events.length, 1);
  assert.equal(again.json.connection.syncedKm, 10438.7);

  // confirmação do app: o evento deixa de ser entregue
  const acked = await call('POST', '/api/tracker/ack', { upToSeq: 1 });
  assert.equal(acked.json.events.length, 0);
  assert.equal(acked.json.connection.syncedKm, 10438.7);
});

test('11/13: erro 503 do rastreador, depois token revogado', async () => {
  clock.now = new Date(clock.now.getTime() + 10 * 60000);
  fake.fail = 1;
  const down = await call('POST', '/api/tracker/sync');
  assert.equal(down.json.connection.status, 'error');
  assert.match(down.json.connection.statusMessage, /indispon/i);
  fake.token = 'novo-token-xyz-789'; // o usuário revogou o token antigo
  clock.now = new Date(clock.now.getTime() + 3 * 3600000);
  const revoked = await call('POST', '/api/tracker/sync');
  assert.equal(revoked.json.connection.status, 'reauth_required');
  assert.match(revoked.json.connection.statusMessage, /Reconecte/);
  // reconectar com o mesmo rastreador preserva contadores
  const discover = await call('POST', '/api/tracker/discover', { provider: 'traccar', fields: { serverUrl: traccarUrl, token: fake.token } });
  const re = await call('POST', '/api/tracker/connect', { draftId: discover.json.draftId, deviceId: '7', bikeKm: 99999, bikeLabel: 'x' });
  assert.equal(re.json.connection.syncedKm, 10438.7);
  assert.notEqual(re.json.connection.status, 'reauth_required');
});

test('CSRF e CORS: sem cabeçalho/origem autorizada o servidor recusa', async () => {
  const noHeader = await call('POST', '/api/tracker/sync', undefined, { 'X-Bros-Client': '0' });
  assert.equal(noHeader.status, 403);
  const evil = await call('POST', '/api/tracker/sync', undefined, { Origin: 'https://evil.example' });
  assert.equal(evil.status, 403);
  const status = await call('GET', '/api/tracker/status', undefined, { Origin: 'https://evil.example' });
  assert.equal(status.headers.get('access-control-allow-origin'), null);
});

test('SSRF: endereço interno é recusado quando o modo de desenvolvimento está desligado', async () => {
  const strict = createTraccarProvider({ allowPrivateHosts: false });
  await assert.rejects(strict.connect({ fields: { serverUrl: 'https://127.0.0.1', token: 'abcdefghij' } }), /rede interna/);
  await assert.rejects(strict.connect({ fields: { serverUrl: 'http://rastreador.exemplo.com', token: 'abcdefghij' } }), /https/);
  await assert.rejects(strict.connect({ fields: { serverUrl: 'https://user:pw@exemplo.com', token: 'abcdefghij' } }), /usuário ou senha/);
});

test('webhook: segredo errado não encontra a conexão; correto dispara sincronização', async () => {
  const status = await call('GET', '/api/tracker/status');
  const hook = new URL(status.json.connection.webhookUrl);
  const wrong = await fetch(base + hook.pathname.replace(/[^/]+$/, 'segredo-errado'), { method: 'POST' });
  assert.equal(wrong.status, 404);
  const right = await fetch(base + hook.pathname, { method: 'POST' });
  assert.equal(right.status, 202);
});

test('desconectar remove credenciais e viagens do servidor', async () => {
  const gone = await call('DELETE', '/api/tracker/connection');
  assert.equal(gone.json.connection, null);
  assert.equal((db.prepare('SELECT COUNT(*) AS n FROM connections').get() as { n: number }).n, 0);
  assert.equal((db.prepare('SELECT COUNT(*) AS n FROM trips').get() as { n: number }).n, 0);
});
