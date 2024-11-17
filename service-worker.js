
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-cache').then((cache) => {
            return cache.addAll([
                './404.html',  // Ensure path is correct for GitHub Pages
                './img/404.png',  // PC version of the error image
                './img/404m.png'  // Mobile version of the error image
            ]);
        })
    );
    self.skipWaiting();  // Activate service worker immediately after installation
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== 'offline-cache') {
                        return caches.delete(cacheName);  // Clean old caches
                    }
                })
            );
        })
    );
    return self.clients.claim();  // Claim control immediately
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match('./404.html');  // Respond with cached 404 page on failure
        })
    );
});
