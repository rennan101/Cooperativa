// Service Worker mínimo — Cooperativa
// Objetivo: habilitar o prompt nativo de instalação (beforeinstallprompt),
// que exige HTTPS + manifest + service worker. Cache completo/offline é
// escopo de uma spec futura.
const CACHE = 'coop-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Estratégia simples: tenta a rede; se falhar (offline), serve do cache.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
