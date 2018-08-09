
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

// // (1) = Estratégia "Cache with Network Fallback"
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
// });


// // (2) = Estratégia "Network only"
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     fetch(e.request)
//   );
// });


// // (3) = Estratégia "Cache only"
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request)
//   )
// })


// // (4) = Estratégia "Network, cache fallback"
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     fetch(e.request)
//       .then(function(res) { // BÔNUS
//         return caches.open(CACHE_DYNAMIC_NAME) // BÔNUS
//           .then(function(cache) { // BÔNUS
//             cache.put(e.request.url, res.clone()); // BÔNUS
//             return res; // BÔNUS
//           }) // BÔNUS
//       }) // BÔNUS
//       .catch(function(err) {
//         return caches.match(e.request);
//       })
//   );
// });


// // (5) = Estratégia "Cache, then network" (Dynamic caching for Cache, then network strategy)
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.open(CACHE_DYNAMIC_NAME)
//       .then(function(cache) {
//         return fetch(e.request)
//           .then(function(res) {
//             cache.put(e.request.url, res.clone());
//             return res;
//           })
//       })
//   );
// });


// (6) = Estratégias "Cache, then network", "Cache with network fallback" e "Cache only"
var STATIC_FILES = [
  '/',
  '/index.html',
  '/src/css/app.css',
  '/src/css/main.css',
  '/src/js/main.js',
  '/src/js/material.min.js',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

function isInArray(string, array) {
  for (var i= 0; i< array.length; i++) {
    if (array[i] === string) {
      return true;
    }
  }
  return false;
}

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('https://httpbin.org/ip') > -1) { // "Cache, then network"
    e.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
          return fetch(e.request)
            .then(function(res) {
              cache.put(e.request.url, res.clone());
              return res;
            })
        })
    );
  } else if (isInArray(e.request.url, STATIC_FILES)) { // "Cache only"
    e.respondWith(
      caches.match(e.request)
    );
  } else { // "Cache with network fallback"
    e.respondWith(
      caches.match(e.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(e.request)
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(e.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function() {});
          }
        })
    );
  }
})