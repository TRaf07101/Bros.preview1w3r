/* Event-driven only: service workers cannot act as permanent alarm timers. */
const CACHE_NAME = 'bros-app-shell-v11';
const IMAGE_CACHE = 'bros-images-v1';
const IMAGE_LIMIT = 150;
const BASE = new URL('./', self.location.href);
const SHELL = new URL('./', BASE).href;
const OFFLINE = new URL('offline.html', BASE).href;
const PRIVACY = new URL('privacy.html', BASE).href;
const ICON = new URL('icons/bros-192.svg', BASE).href;
const BADGE = new URL('icons/notification-badge.svg', BASE).href;
const TARGETS = {
  checklist: '#checklist',
  mileage: '#reminders/mileage',
  maintenance: '#reminders/care',
  profile: '#reminders/profile',
  history: '#history',
  reminders: '#reminders',
};

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([OFFLINE, PRIVACY, ICON, BADGE, new URL('icons/bros-512.svg', BASE).href]).catch(() => {});
    try {
      const response = await fetch(SHELL, { cache: 'reload' });
      const text = await response.clone().text();
      if (response.ok && !text.includes('/@vite/client') && text.includes('<div id="root">')) await cache.put(SHELL, response);
    } catch { /* An existing offline copy remains usable when updating without a connection. */ }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('bros-app-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'BROS_SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'BROS_CLOSE_NOTICES') event.waitUntil(self.registration.getNotifications().then(notices => notices.filter(notice => notice.tag.startsWith('bros:')).forEach(notice => notice.close())));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method === 'GET' && request.destination === 'image' && (url.origin !== BASE.origin || url.pathname.startsWith(new URL('images/', BASE).pathname))) {
    // Fotos das motos: guarda a última cópia para continuarem aparecendo sem internet.
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') {
          await cache.put(request, response.clone());
          const keys = await cache.keys();
          if (keys.length > IMAGE_LIMIT) await Promise.all(keys.slice(0, keys.length - IMAGE_LIMIT).map(key => cache.delete(key)));
        }
        return response;
      } catch { return Response.error(); }
    })());
    return;
  }
  if (request.method !== 'GET' || url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
          const text = await response.clone().text();
          if (!text.includes('/@vite/client') && text.includes('<div id="root">')) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(SHELL, response.clone());
          }
        }
        return response;
      } catch {
        return await caches.match(request) || await caches.match(SHELL) || await caches.match(OFFLINE) || new Response('Sem conexão. Tente novamente quando a internet voltar.', { headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
      }
    })());
  } else if (url.pathname.startsWith(new URL('icons/', BASE).pathname)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = Object.prototype.hasOwnProperty.call(TARGETS, event.notification.data?.target) ? event.notification.data.target : 'reminders';
  const destination = new URL(TARGETS[target], BASE).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existing = windows.find(client => client.url.startsWith(BASE.href));
    if (existing) {
      await existing.focus();
      existing.postMessage({ type: 'BROS_NOTICE_OPEN', target });
    } else await self.clients.openWindow(destination);
  })());
});

// The receiver is ready for a future push provider. No provider/subscription is connected now.
self.addEventListener('push', event => {
  let payload = {};
  try { payload = event.data?.json() || {}; } catch { payload = {}; }
  const title = typeof payload.title === 'string' ? payload.title.slice(0, 100) : 'Bros. Um cuidado para conferir';
  const body = typeof payload.body === 'string' ? payload.body.slice(0, 500) : 'Abra o app para conferir seus próximos cuidados.';
  const target = Object.prototype.hasOwnProperty.call(TARGETS, payload.target) ? payload.target : 'reminders';
  event.waitUntil(self.registration.showNotification(title, { body, icon: ICON, badge: BADGE, tag: 'bros:push', data: { target }, lang: 'pt-BR' }));
});