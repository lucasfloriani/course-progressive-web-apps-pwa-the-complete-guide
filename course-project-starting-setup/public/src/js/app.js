var deferredPrompt;

// Código para registrar um service worker
// Verifica se o navegador suporta a função de serviceWorker
// navigator == browser
if ('serviceWorker' in navigator) {
  // Arquivo que contem o código do service worker,
  // registrando assim, como um service worker
  //
  // A função register pode receber um objeto como segundo parâmetro,
  // onde o mesmo pode conter uma propriedade de nome scope.
  // Esta propiedade recebe qual o escopo que o service worker irá trabalhar,
  // no qual seria quais páginas o service work poderá ser executado.
  // register('/sw.js', {scope: '/help/'})
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

// Evento que dispara antes de mostra o banner de adicionar
// aplicação a homescreen
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});