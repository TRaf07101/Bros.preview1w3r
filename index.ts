import { createApp } from './app.ts';
import { loadConfig } from './config.ts';
import { openDb } from './db.ts';
import { buildRegistry } from './providers/registry.ts';
import { startScheduler } from './scheduler.ts';
import { SyncEngine } from './sync/engine.ts';

const config = loadConfig();
const db = openDb(config.dbPath);
const registry = buildRegistry(config);
const engine = new SyncEngine(db, config, registry);
const server = createApp({ config, db, registry, engine });
const scheduler = startScheduler(db, engine, config, message => console.warn(message));
server.listen(config.port, () => console.log(`bros-tracker-server ouvindo na porta ${config.port}`));
const shutdown = () => { scheduler.stop(); server.close(() => { db.close(); process.exit(0); }); };
process.on('SIGTERM', shutdown); process.on('SIGINT', shutdown);
