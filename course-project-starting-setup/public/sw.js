// self keyword referencia para o próprio escopo do service worker
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  // self.clients.claim() assegura que o service worker
  // estão carregados e ativados corretamente,
  // usado para previnir possíveis erros que podem ocorrer.
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // respondWith possibilita reescrever os dados que são enviados
  // de resposta a página como um proxy.
  event.respondWith(fetch(event.request));
});