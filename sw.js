// GPS app shell. Same-origin GET only; GitHub API calls are never touched or cached.
// Pages: network first (updates arrive on the next open), cache when offline. Other shell files: cache first.
const VERSION = "eb-gps-5cc77b662f67";
const SHELL = ["./", "./index.html", "./setup.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    const key = url.pathname.endsWith("setup.html") ? "./setup.html" : "./index.html";
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); if (r.ok) caches.open(VERSION).then(c => c.put(key, copy)); return r; }).catch(() => caches.match(key)));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
