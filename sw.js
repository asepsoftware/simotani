const CACHE_NAME = 'simotani-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo_simotani.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Fetch Service Worker
self.addEventListener('fetch', (event) => {
  // Jangan cache request ke Firebase agar data sensor tetap update
  if (event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
