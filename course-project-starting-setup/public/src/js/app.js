var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

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
    })
    .catch(function(err) {
      console.log(err);
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

/*############## Promises e Fetch ############## */
console.log('This is executed right after setTimeout()');
var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    // resolve('This is executed once the timer is done!');
    reject({code: 500, message: 'An error ocurred!'});
    // console.log('This is executed once the timer is done!');
  }, 3000);
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://httpbin.org/ip');

xhr.responseType = 'json';
xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log('Error!');
}

xhr.send();

fetch('http://httpbin.org/ip')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

fetch('http://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors',
  body: JSON.stringify({message: 'Does this work?'})
})
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });
// promise.then(function(text) {
//   return text;
// }, function(err) {
//   console.log(err.code, err.message);
// }).then(function(newText) {
//   console.log(newText);
// });

promise.then(function(text) {
  return text;
}).then(function(newText) {
  console.log(newText);
}).catch(function(err) {
  console.log(err.code, err.message);
});

console.log('This is executed right after setTimeout()');
