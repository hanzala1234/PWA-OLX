var staticFiles=['index.html','posting.html','posting.css','home.css','images/Logo.png','off_ads.html','ads.css'
,'discription.css','images/pets.PNG','images/electronics.PNG','images/Fashion.PNG','images/cars.PNG','images/cars.PNG',
'images/bikes.PNG','images/service.PNG','images/furniture.PNG','images/properties.PNG','images/home_add.PNG','images/menu.png','offline.html'];

self.addEventListener("install",function(event){
    console.log("Service worker is installing now");
    self.skipWaiting();
    event.waitUntil(
        caches.open("staticFiles").then(function(cach){
            return cach.addAll(staticFiles);
        }));


});
self.addEventListener("fetch",function(event){

    event.respondWith(
        caches.match(event.request).then(function(response){
            return response||fetch(event.request).catch(function(err){
                return caches.match("offline.html").then(function(res){
                    return res;
                });
            });
        }));
    
    /*.then(function(response1){
        return caches.open("dynamic-content").then(function(myCach){
            myCach.put(event.request,response1.clone());
            return response1;
        })
    });*/
});

