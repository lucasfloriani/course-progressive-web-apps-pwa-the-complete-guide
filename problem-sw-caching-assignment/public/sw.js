// (6)
var CACHE_STATIC_NAME = 'static-v3';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(e) {
  // (2), (3) and (5)
  e.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/material.min.js',
          '/src/js/main.js'
        ]);
      })
  );
});

// (7)
self.addEventListener('activate', function(e) {
  console.log('[Service Worker] activate');
  e.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if(key !== CACHE_STATIC_NAME || key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] remove cache ', key);
            return caches.delete(key);
          }
        }));
      })
  );

  return self.clients.claim();
});

// (4)
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          // (8)
          return fetch(e.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(e.request.url, res.clone());
                  return res;
                });
            }).catch(function() {});
        }
      })
  );
})