const CACHE_NAME = "STORES_CACHES_2";

self.addEventListener("install", function () {
  caches.open(CACHE_NAME).then(function (cache) {
    cache.addAll(["/index.html", "/dist/javascript/bundle.js"]);
  });
});

self.addEventListener("activate", function (ev) {
  ev.waitUntil(
    caches.keys().then(function (cacheNames) {
      let promises = cacheNames.map((cacheName) => {
        if (CACHE_NAME !== cacheName) return caches.delete(cacheName);
      });
      return Promise.all(promises);
    })
  );
});

function searchInCacheOrMakeRequest(request) {
  const cachePromise = caches.open(CACHE_NAME);
  const matchPromise = cachePromise.then(function (cache) {
    return cache.match(request);
  });
  return Promise.all([cachePromise, matchPromise]).then(function ([
    cache,
    cacheResponse,
  ]) {
    const fetchPromise = fetch(request).then(function (fetchResponse) {
      if (!/^https?:$/i.test(new URL(request.url).protocol)) return;
      cache.put(request, fetchResponse.clone());
      return fetchResponse;
    });
    return cacheResponse || fetchPromise;
  });
}

self.addEventListener("fetch", function (ev) {
  ev.respondWith(
    caches
      .match(ev.request)
      .then(function (response) {
        return searchInCacheOrMakeRequest(ev.request);
      })
      .catch(function (err) {
        if (ev.request.mode == "navigate") {
          return caches.match(ev.request);
        }
      })
  );
});