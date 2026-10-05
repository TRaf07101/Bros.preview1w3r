import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Config } from './config.ts';

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

export interface Ctx { req: IncomingMessage; res: ServerResponse; url: URL; params: Record<string, string>; body: unknown; config: Config }
export type Handler = (ctx: Ctx) => Promise<unknown> | unknown;
interface Route { method: string; parts: string[]; handler: Handler; raw: boolean }

export class Router {
  private routes: Route[] = [];
  /** raw: rota fora de CORS/cookies (webhooks de servidores). */
  add(method: string, path: string, handler: Handler, raw = false) { this.routes.push({ method, parts: path.split('/').filter(Boolean), handler, raw }); }
  match(method: string, pathname: string): { route: Route; params: Record<string, string> } | null {
    const parts = pathname.split('/').filter(Boolean);
    for (const route of this.routes) {
      if (route.method !== method || route.parts.length !== parts.length) continue;
      const params: Record<string, string> = {};
      if (route.parts.every((part, i) => part.startsWith(':') ? (params[part.slice(1)] = decodeURIComponent(parts[i]), true) : part === parts[i])) return { route, params };
    }
    return null;
  }
}

export function parseCookies(header: string | undefined): Record<string, string> {
  const result: Record<string, string> = {};
  for (const part of (header || '').split(';')) { const i = part.indexOf('='); if (i > 0) result[part.slice(0, i).trim()] = part.slice(i + 1).trim(); }
  return result;
}

export const cookieHeader = (name: string, value: string, config: Config, maxAgeSeconds: number) =>
  `${name}=${value}; Path=/; HttpOnly; Max-Age=${maxAgeSeconds}; ${config.cookieSecure ? 'Secure; SameSite=None' : 'SameSite=Lax'}`;

export async function readJson(req: IncomingMessage, limit = 32 * 1024): Promise<unknown> {
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > limit) throw new HttpError(413, 'Requisição grande demais.');
    chunks.push(chunk as Buffer);
  }
  if (!size) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new HttpError(400, 'JSON inválido.'); }
}

export function send(res: ServerResponse, status: number, body: unknown, headers: Record<string, string | string[]> = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
  res.end(payload);
}

/** Limite simples por chave (IP) em janela deslizante, na memória. */
export function rateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string): boolean => {
    const now = Date.now(); const recent = (hits.get(key) || []).filter(t => now - t < windowMs);
    if (recent.length >= max) { hits.set(key, recent); return false; }
    recent.push(now); hits.set(key, recent);
    if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < windowMs)) hits.delete(k);
    return true;
  };
}
