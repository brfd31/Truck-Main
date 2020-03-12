const staticCacheName = 'my-Cache-V12';
const dynamicCacheName = 'site-dynamic-V12';
const switchcaching = false;
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/style.css',
    '/css/materialize.min.css',
    '/images/11.png',
    '/images/12.png',
    '/images/21.png',
    '/images/31.png',
    '/pages/11.html',
    '/pages/12.html',
    '/pages/21.html',
    '/pages/31.html',
    '/pages/51.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
];

//cache size limit function

const limitCacheSize = (name, size) => {
    caches.open(name) .then(cache => {
        cache.keys().then(keys => {
            if(keys.lenght > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
if (switchcaching == true) {
// install event
self.addEventListener('install', evt => {
    //console.log('service workier has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
                console.log('caching assets');
                cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
   // console.log('fetch event', evt);
   evt.respondWith(
       caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 20);
                return fetchRes;
            })
        });
       }).catch(() => {
           if(evt.request.url.indexOf('.html') > -1){
                return caches.match('/pages/fallback.html');
           }
            
        })
   );
});
}