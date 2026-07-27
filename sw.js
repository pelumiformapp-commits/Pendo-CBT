const CACHE_NAME = "pendo-cbt-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/dashboard.html",
  "/admin.html",
  "/admin_scores.html",
  "/exam.html",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
