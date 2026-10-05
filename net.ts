import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { ProviderInputError } from './types.ts';

const privateV4 = (ip: string) => {
  const [a, b] = ip.split('.').map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
};
const privateV6 = (ip: string) => { const v = ip.toLowerCase(); return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80') || v.startsWith('::ffff:'); };
export const isPrivateAddress = (ip: string) => isIP(ip) === 4 ? privateV4(ip) : isIP(ip) === 6 ? privateV6(ip) : true;

/**
 * Valida o endereço do rastreador informado pelo usuário. O servidor só fala
 * HTTPS com endereços públicos, para não virar ponte para a rede interna.
 */
export async function assertSafeProviderUrl(raw: string, allowPrivate: boolean): Promise<URL> {
  let url: URL;
  try { url = new URL(raw.trim()); } catch { throw new ProviderInputError('Endereço inválido. Use algo como https://rastreador.exemplo.com.'); }
  if (url.username || url.password) throw new ProviderInputError('Não coloque usuário ou senha no endereço.');
  if (!allowPrivate) {
    if (url.protocol !== 'https:') throw new ProviderInputError('O endereço precisa começar com https://.');
    const host = url.hostname.replace(/^\[|\]$/g, '');
    const addresses = isIP(host) ? [host] : (await lookup(host, { all: true }).catch(() => [])).map(item => item.address);
    if (!addresses.length) throw new ProviderInputError('Não encontramos esse endereço na internet.');
    if (addresses.some(isPrivateAddress)) throw new ProviderInputError('Esse endereço aponta para uma rede interna e não pode ser usado.');
  } else if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new ProviderInputError('Endereço inválido.');
  url.hash = ''; url.search = '';
  return url;
}
