const CACHE_NAME = "STORES_CACHES_2";

//self a referencia a nuestro service workers
//funcion cuando la services workers se instale
self.addEventListener("install", function () {
  //guardar archivos iniciales
  //caches.open("STORES_CACHES") retorna una promesa
  //cache es el resultado de la promesa
  caches.open(CACHE_NAME).then(function (cache) {
    //agregamos archivos
    cache.addAll(["/index.html", "/dist/javascript/bundle.js"]);
  });
});

self.addEventListener("activate", function (ev) {
  //evita que la sw deje de ejecutarse mientras se eliminan las caches

  //pasamos una promesa como parametro a waitUntil
  //para que la sw espere hasta que se ejecute la promesa
  ev.waitUntil(
    //caches.keys  devuelve una coleccion con los nombre de los caches en forma de promesa
    //cacheNames es el nombre de la oleccion que devuelve caches.keys
    caches.keys().then(function (cacheNames) {
      //creamos una promesa que espere a que todos los caches viejos se eliminen
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


