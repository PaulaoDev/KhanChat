var URLS = [ // Add URL you want to cache in this list.
  '/', // If you have separate JS/CSS files,
  '/src/images/icon.png',
  '/src/css/min/login.css', // add path to those files here
  '/src/js/vue.js',
  '/src/js/min/login.js',
  '/src/css/min/painel.css',
  '/src/css/min/emojione.css',
  '/src/css/min/menu.css',
  '/src/css/min/mobile.css',
  '/src/css/min/spinner.css',
  '/socket.io/socket.io.js',
  '/src/js/min/emojione.js',
  '/src/js/min/clipboard.js',
  '/src/js/min/jquery.js',
  '/src/js/min/electron.js',
  '/src/js/min/chat.js',
  '/src/js/min/app.js'
]

var CACHE = 'cache-only';

// On install, cache some resources.
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache only strategy.
self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(URLS);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
