import { randomUUID } from 'node:crypto';
import type { Config } from '../config.ts';
import { seal, randomToken } from '../crypto.ts';
import type { Db } from '../db.ts';
import type { ProviderCredentials, TrackerProvider } from '../providers/types.ts';

export interface LinkInput { userId: number; provider: TrackerProvider; credentials: ProviderCredentials; deviceId: string; bikeKm: number; bikeLabel: string }

/**
 * Cria (ou reautentica) a conexão. O rastreador não sabe a quilometragem da moto:
 * a partir de bikeKm, o bros. soma apenas o que o rastreador medir depois deste momento.
 */
export async function linkTracker(db: Db, config: Config, input: LinkInput, now = new Date()): Promise<string> {
  const session = { credentials: input.credentials, deviceId: input.deviceId };
  const device = await input.provider.getDevice(session);
  const odometer = await input.provider.getOdometer(session);
  const sealed = seal(JSON.stringify(input.credentials), config.secretKey);
  const existing = db.prepare('SELECT id, provider, device_id FROM connections WHERE user_id = ?').get(input.userId) as unknown as { id: string; provider: string; device_id: string } | undefined;
  if (existing && existing.provider === input.provider.info.id && existing.device_id === device.id) {
    // Mesmo rastreador: só renova a credencial e mantém contadores, para não perder nem duplicar quilômetros.
    db.prepare("UPDATE connections SET creds_sealed = ?, device_name = ?, status = 'connected', status_detail = '', fail_count = 0, next_attempt_at = NULL WHERE id = ?").run(sealed, device.name, existing.id);
    return existing.id;
  }
  if (existing) db.prepare('DELETE FROM connections WHERE id = ?').run(existing.id);
  const id = randomUUID();
  db.prepare(`INSERT INTO connections (id, user_id, provider, creds_sealed, device_id, device_name, bike_label, status, odometer_kind, last_odo_m, bike_km_synced, linked_at, webhook_secret)
              VALUES (?,?,?,?,?,?,?,'connected',?,?,?,?,?)`)
    .run(id, input.userId, input.provider.info.id, sealed, device.id, device.name, input.bikeLabel, odometer?.kind ?? null, odometer?.meters ?? null, input.bikeKm, now.toISOString(), randomToken(24));
  return id;
}
