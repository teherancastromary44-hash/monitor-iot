const CACHE_NAME = "monitor-iot-cache-v1";
const URLS_A_CACHEAR = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_A_CACHEAR);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombresCaches) => {
      return Promise.all(
        nombresCaches.map((nombre) => {
          if (nombre !== CACHE_NAME) {
            return caches.delete(nombre);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request);
    })
  );
});