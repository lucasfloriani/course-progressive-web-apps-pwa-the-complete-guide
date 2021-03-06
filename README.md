# Progressive Web Apps (PWA) - The Complete Guide | Udemy

## O que são PWAs

São um conjunto de features que podemos adicionar a uma aplicação web para aparecer e funcionar como um aplicativo nativo.
Podemos usar PWAs para utilizar recursos extras que não conseguimos em aplicações web, como funcionamento offline, salvar seu icone na homescreen, usar camera, entre outras vantagens.

PWAs devem ser:

* **Confiável**: Carregar rapidamente e prover funcionalidade mesmo offline;
* **Rapido**: Responder rapidamente as ações dos usuários;
* **Engajador**: Parecer como um app nativo em dispositivos móveis.

## Blocos principais de construção

### Service Workers

Javascripts rodando em processo de background mesmo se a aplicação estiver fechada, é ele que oferece acesso offline/cache e habilita outras funções das PWAs.

Podemos listar funcionalidades especificas que são possíveis através de service workers, como:

* **Background Sync**: Buscar dados do usuário em background;
* **Web Push**: Push notifications como aplicações mobile;
* **Application Manifest**: Permite instalar sua aplicação a homescreen;
* **Responsive Design**: Aplicações funcionando independente de qual dispositivo utilizado (responsividade);
* **Geolocation API**: Acesso a localização do usuário;
* **Media API**: Acesso ao Microfone e Câmera do dispositivo do usuário.

## O que significa "Progressive Enhancement" (Aprimoramento Progressivo)

Possibilidade de adicionar aos poucos quais funcionalidades da PWA quiser a sua aplicação.

## Web App Manifest

Arquivo manifest.json adicionado a sua aplicação, onde este possibilitará a função de salvar seu aplicativo na sua homescreen.

### Propriedades do arquivo manifest.json

* **name**: Nome do nosso PWA, que será usado em vários lugares, como por exemplo na tela de abertura do app;
* **short_name**: Versão reduzida do nome do nosso PWA, usado por exemplo abaixo do icone salvo na homescreen;
* **start_url**: Url na qual o PWA vai abrir inicialmente na homepage;
* **scope**: Quais páginas são incluídas em nossa "Experiência PWA" (standalone (como app), fullscreen (como um app fullscreen), minimal-ui (standalone com menos ui) ou browser (abrir no navegador));
* **display**: Se uma aplicação é standalone, o qual é se o browser realmente precisa controlar a aplicação ("standalone" == default);
* **background_color**: Cor de fundo usado nos carregamentos e na tela de abertura;
* **theme_color**: Cor de tema, usado por exemplo na barra do topo de uma aplicação;
* **description**: Usado quando um usuário salva o app nos favoritos do browser, substituindo a descrição padrão que o browser adiciona;
* **dir**: Usado para demonstrar qual a direção de leitura do app;
* **lang**: Principal linguagem do app;
* **orientation**: Qual orientação default ele deve carregar do dispositivo, "deitado" (landscape-primary), "de pé" (portrait-primary) ou qualquer (any);
* **icons**: Lista de icones onde o aplicativo ira utilizar o qual melhor se adapta a resolução do dispositivo, usado por exemplo na homescreen;
* **related_applications**: Lista de aplicações realmente nativas relacionadas

```node
{
  "name": "Sweaty - Activity Tracker",
  "short_name": "Sweaty",
  "start_url": "/index.html",
  "scope": ".", // . == Todas as páginas
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "3F51B5",
  "description": "Keep running until you're super sweaty!",
  "dir": "ltr",
  "lang": "en-US",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/src/images/icons/app-icon-48x48.png", // Icon path
      "type": "image/png", // Image type
      "sizes": "48x48" // Icon size
    },
    {
      "src": "/src/images/icons/app-icon-96x96.png",
      "type": "image/png",
      "sizes": "96x96"
    }
  ],
  "related_applications": [
    {
      "plataform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.example.app1",
      "id": "com.example.app1"
    }
  ]
}
```

## Critérios verificados em 2018/08/07 para mostrar o banner de adicionar a homescreen

* Ter um arquivo manifest com:
  * Conter um **name** ou **short_name**;
  * Um icone png de 192px e 512px;
  * Um **start_url**;
  * Campo **display** precisa ser _fullscreen_, _standalone_ ou _minimal-ui_
* Ter um **service worker** registrado em seu site;
* O aplicativo não estiver instalado;
* Conseguir o engajamento do heuristico do usuário (atualmente, o usuário deverá interagir com o dominio por pelo menos 30 segundos);
* Estar hospedado sobre o protocolo **HTTPS** (requisito para utilizar um service worker);

Com estes critérios atingidos, o Chrome irá disparar o evento _beforeinstallprompt_ que você pode usar para avisar o usuário para instalar seu Progressive Web App.

## Adicionando funcionalidade ao Safari

O safari atualmente (2018/08/07) não suporta a utilização de PWAs, porem podemos adicionar tags ao head para assim imitarmos a funcionalidade de adicionar um icone da aplicação em sua homescreen.

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="PWAGram">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-57x57.png" sizes="57x57">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-60x60.png" sizes="60x60">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-72x72.png" sizes="72x72">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-76x76.png" sizes="76x76">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-114x114.png" sizes="114x114">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-120x120.png" sizes="120x120">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-144x144.png" sizes="144x144">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-152x152.png" sizes="152x152">
<link rel="apple-touch-icon" href="/src/images/icons/apple-icon-180x180.png" sizes="180x180">
```

## Adicionando funcionalidade ao Internet Explorer

Por o Internet Explorer não receber as funcionalidades relacionadas as PWAs, podemos pelo menos adicionar algumas tags especificas ao head para assim possibilitar adicionar a aplicação a homescreen.

```html
<meta name="msapplication-TileImage" content="/src/images/icons/app-icon-144x144.png">
<meta name="msapplication-TileColor" content="#fff">
<meta name="theme-color" content="#3f51b5">
```

## O que são Service Workers

São javascript que não rodam na single thread normal de execução dos javascripts das páginas web, rodando em si em uma thread especifica deles, ficando assim separado.
Rodam em background e são desacoplados do DOM e páginas HTML.
Contem um escopo especifico, como por exemplo o dominio da página.
São disponíveis para todas as páginas da sua aplicação, baseadas em seu dominio (dominio.com.br).
Funcionam mesmo após as páginas da aplicação serem fechadas.
São bons para reagir a **eventos especificos**, como por exemplo eventos de **push notification**.

### Eventos "escutáveis" nos service workers

#### Fetch

Browser ou Javascript relacionado a uma página iniciando um Fetch (Http request). Qualquer requisição, podendo ser requisição de download de imagens para página, algo como um proxy, porem em requisições com XMLHttpRequest não iniciam o evento, como a biblioteca Axios que utiliza o XMLHttpRequest.
Podemos bloquear, retornar assets no cache, podendo assim controlar as ações das requisições

#### Push Notifications

Navegadores como Chrome, Firefox, etc contem seus próprios servidores de Web Push Notification, onde são utilizado pelos service workers para enviar notificações aos usuários.

#### Notification Interaction

Interação do usuário quando aparece a notificação.

#### Background Sync

Alguns browsers podem realizar sincronização em background, onde você armazena uma certa ação que não pode ser executada agora, e executa quando a conexão com a internet for restabelecida.
Quando a conexão da internet for restabelecida, o browser emite um evento para assim poder realizar as ações necessárias.

### Service Worker Lifecycle

#### Instalação (install)

Momento que o service worker é instalado, onde podemos adicionar o código dentro do service worker enquanto ele é instalado.
Executa somente quando é reconhecido alteração do arquivo service worker ou na primeira.

#### Ativação (activate)

É iniciado o evento quando não há nenhum outro service worker registrado, onde assim ele é ativado.
Após a ativação do service worker, ele então controlará todas as páginas do escopo (baseado em suas configurações).

### Service Workers FAQ

**Service Worker são instalados cada atualização?**
R: Não, enquanto o browser executa naturalmente o metodo _register()_ cada ver que recarregamos a página, ele não instala o service worker se o arquivo do service worker não tiver mudado. Se o arquivo mudou nem que seja 1 byte, ele instalará o novo service worker (mas espera até a ativação)

**Posso desregistrar um Service Worker?**
R: Sim, é possível, o seguinte código realiza a remoção:

```node
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

**Meu aplicativo se comporta de maneira estranha/ Um novo Service Worker não está sendo instalado**
R: Ele está provavelmente sendo instalado mas como ainda está aberto alguma tab/janela com o app aberto (no mesmo navegador). Novos service workers não ativam antes de todas as páginas do app rodando não forem fechadas. Tenha certeza de fazer isto e tentar novamente.

**Posso ter multiplos eventListeners 'fetch' no service worker?**
R: Sim é possível.

**Posso ter multiplos service workers numa página?**
R: Sim, mas somente em diferentes escopos. Você pode usar um service worker para o subdiretório _/help_ e outro para o resto da aplicação. O service worker mais especifico (=> /help) subscreve o outro neste escopo.

**Service Workers comunicam com minha página/meu código javascript normal?**
R: Sim, isso é possivel usando mensagem. Caso seja necessário verifique o seguinte link para mais informações  [http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html#.W2nYhNJKiUl](http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html#.W2nYhNJKiUl).
Este link não seria especifico aos service workers, ele é aplicavel a todos os Web Workers.

**Qual a diferença entre Web Workers e Service Workers?**
R: Service Workers são um tipo especial de Web Workers. Web Workers tambem rodam em uma thread em background, desacoplado do DOM. Eles não continuam executando depois que a página é fechada. O Service Worker por outro lado, continua executando (dependendo do sistema operacional) e tambem é desacoplado de uma página.

## Cache API

São salvos em formato Key (HTTP Request enviados, ou seja, a URL requisitada), Value (Response da requisição da URL).
Podem ser acessados tanto pelos service workers, como por Javascript "normal".
Usamos este recurso para pegar a resposta da requisição do cache ao invez de realizar a requisição novamente, onde em alguns casos, não há internet.
