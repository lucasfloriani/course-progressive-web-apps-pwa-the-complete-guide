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
* Estar hospedado sobre o protocolo **HTTPS** (requisito para utilizar um service worker);

Com estes critérios atingidos, o Chrome irá disparar o evento _beforeinstallprompt_ que você pode usar para avisar o usuário para instalar seu Progressive Web App.