const CACHE_NAME = "v1_cache_movies_app";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon-32.png",
    "./img/icon-64.png",
    "./img/icon-128.png",
    "./img/maskable.png",
    "./img/icon-256.png",
    "./img/icon-512.png",
    "./img/icon-1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "https://unpkg.com/vue@3",
    "./css/main.css",
    "./pages/fallback.html"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    );
});

self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        (cacheName) => {
                            if(cacheWhiteList.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                );
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res) {
                    return res;
                }

                return fetch(e.request);
            }
        ).catch(
            () => caches.match("./pages/fallback.html")
        )
    );
});