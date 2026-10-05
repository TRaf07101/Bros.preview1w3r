export interface Config {
  port: number;
  secretKey: Buffer;
  allowedOrigins: string[];
  publicUrl: string;
  dbPath: string;
  pollIntervalMs: number;
  allowPrivateProviderHosts: boolean;
  cookieSecure: boolean;
  /** Margem depois do fim de uma viagem antes de contá-la (o rastreador pode dividir ou estender). */
  tripSettleMs: number;
  /** Velocidade máxima considerada possível para uma NXR 160. Acima disso, o dado vai para conferência. */
  maxPlausibleKmh: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const key = Buffer.from(env.BROS_SECRET_KEY || '', 'base64');
  if (key.length !== 32) throw new Error('BROS_SECRET_KEY ausente ou inválida: informe 32 bytes em base64.');
  const origins = (env.BROS_ALLOWED_ORIGINS || '').split(',').map(item => item.trim().replace(/\/$/, '')).filter(Boolean);
  const bool = (value: string | undefined, fallback: boolean) => value === undefined || value === '' ? fallback : value === 'true';
  return {
    port: Number(env.PORT || 8787),
    secretKey: key,
    allowedOrigins: origins,
    publicUrl: (env.BROS_PUBLIC_URL || '').replace(/\/$/, ''),
    dbPath: env.BROS_DB_PATH || './data/bros-tracker.sqlite',
    pollIntervalMs: Math.max(5000, Number(env.BROS_POLL_INTERVAL_MS || 120000)),
    allowPrivateProviderHosts: bool(env.BROS_ALLOW_PRIVATE_PROVIDER_HOSTS, false),
    cookieSecure: bool(env.BROS_COOKIE_SECURE, true),
    tripSettleMs: Number(env.BROS_TRIP_SETTLE_MS || 120000),
    maxPlausibleKmh: Number(env.BROS_MAX_PLAUSIBLE_KMH || 200),
  };
}
