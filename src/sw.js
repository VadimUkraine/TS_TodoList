const staticCacheName = "site-static-v1";

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(serviceWorkerOption.assets);
    }),
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => (
      Promise.all(keys
        .filter((key) => key !== staticCacheName)
        .map((key) => caches.delete(key)))
    )),
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => (cacheRes || fetch(evt.request))),
  );
});
