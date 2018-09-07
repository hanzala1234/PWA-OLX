var staticFiles=['index.html','posting.html','posting.css','home.css'];

self.addEventListener("install ",function(event){
    console.log("installing service worker");
    self.skipWaiting();
    event.waitUntil(
        caches.open("staticFiles").then(function(cach){
            return cach.addAll(staticFiles);
        }));


});
self.addEventListener("fetch",function(event){
event.respondWith(caches.match(event.request.url).then(function(response){
    return response||fetch(event.request);
})

);

});