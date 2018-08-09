var CACHE_STATIC_NAME = 'static-v13';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';
var STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/js/app.js',
  '/src/js/feed.js',
  '/src/js/promise.js',
  '/src/js/fetch.js',
  '/src/js/material.min.js',
  '/src/css/app.css',
  '/src/css/feed.css',
  '/src/images/main-image.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
]
// self keyword referencia para o próprio escopo do service worker
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  // waitUntil espera até uma função executar
  //
  // caches.open() cria o cache do dominio ou se tiver, abre ele.
  // Usa um nome para separar os caches em subdiretórios,
  // podendo assim organiza-los a vontade.
  //
  // caches.open() retorna uma promise, onde seu valor ao
  // primeiro then retorna a referência do cache
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        // Usado como request não como diretórios aos arquivos
        // por isso a home pode ser chamada tanto por '/'
        // como por '/index.html'
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll(STATIC_FILES);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  // self.clients.claim() assegura que o service worker
  // estão carregados e ativados corretamente,
  // usado para previnir possíveis erros que podem ocorrer.
  return self.clients.claim();
});

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
/*-*-*-*-*-*-*-*-* Estratégias *-*-*-*-*-*-*-*-*/
/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

// Estratégia 'Cache with Network Fallback'
// self.addEventListener('fetch', function(event) {
//   // respondWith possibilita reescrever os dados que são enviados
//   // de resposta a página como um proxy.
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if(response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function() {
//               return caches.open(CACHE_STATIC_NAME)
//                 .then(function(cache) {
//                   return cache.match('/offline.html');
//                 })
//             });
//         }
//       })
//   );
// });


// Estratégia 'Cache Only', não usa nenhum cache dinâmico
// self.addEventListener('fetch', function(event) {
//   // respondWith possibilita reescrever os dados que são enviados
//   // de resposta a página como um proxy.
//   event.respondWith(
//     caches.match(event.request)
//   );
// });


// Estratégia 'Network Only'
// self.addEventListener('fetch', function(event) {
//   // respondWith possibilita reescrever os dados que são enviados
//   // de resposta a página como um proxy.
//   event.respondWith(
//     fetch(event.request)
//   );
// });


// Estratégia 'Network with Cache Fallback'
// self.addEventListener('fetch', function(event) {
//   // respondWith possibilita reescrever os dados que são enviados
//   // de resposta a página como um proxy.
//   event.respondWith(
//     fetch(event.request)
//       .then(function(res) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//           .then(function(cache) {
//             cache.put(event.request.url, res.clone());
//             return res;
//           })
//       })
//       .catch(function(err) {
//         return caches.match(event.request);
//       })
//   );
// });


// Estratégia 'Cache, then Network' com suporte offline
// Tenta pegar o cache primeiro, se o network for mais rapido aborta o cache
// e adiciona a resposta do network na tela e no cache.
//
// self.addEventListener('fetch', function(event) {
//   // respondWith possibilita reescrever os dados que são enviados
//   // de resposta a página como um proxy.
//   var url = 'https://httpbin.org/get';

//   if (event.request.url.indexOf('url') > -1) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function(cache) {
//           return fetch(event.request)
//             .then(function(res) {
//               cache.put(event.request.url, res.clone());
//               return res;
//             })
//         })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           if(response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function(res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function(cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch(function() {
//                 return caches.open(CACHE_STATIC_NAME)
//                   .then(function(cache) {
//                     if (event.request.url.indexOf('/help') > -1) {
//                       return cache.match('/offline.html');
//                     }
//                   })
//               });
//           }
//         })
//     )
//   }
// });


// Estratégia 'Cache Only' para static assets (no else if com regex)
self.addEventListener('fetch', function(event) {
  // respondWith possibilita reescrever os dados que são enviados
  // de resposta a página como um proxy.
  var url = 'https://httpbin.org/get';

  if (event.request.url.indexOf('url') > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
          return fetch(event.request)
            .then(function(res) {
              cache.put(event.request.url, res.clone());
              return res;
            })
        })
    );
  } else if (new RegExp('\\b' + STATIC_FILES.join('\\b|\\b') + '\\b').test(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if(response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function() {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function(cache) {
                    if (event.request.url.indexOf('/help') > -1) {
                      return cache.match('/offline.html');
                    }
                  })
              });
          }
        })
    )
  }
});