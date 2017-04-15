var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        ESApi.init('1ad62a5cc9237e7d');
        
        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
        var marker = new google.maps.Marker({
              position: latLong,
              map: map,
              title: 'my location'
          });       
        
    },
    
    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
    
    nearbySearchTest: function(){
               
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        map = new google.maps.Map(document.getElementById('map'), {
          center: latLong,
          zoom: 15
        });
        
        var marker = new google.maps.Marker({
              position: latLong,
              map: map,
              title: 'my location 2'
        });     

        var request = {
            location: latLong,
            radius: '500',
            types: ['restaurant'],
            minPriceLevel: 0,
            maxPriceLevel: 1,
            openNow: true
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);
            }
        }
    }},
    
    testFunc: function() {
        
        ESApi.searchRestaurants({ 'street-address': '316 W. Washington Ave. Madison, WI' }, function(response) {
        var address = response.address;
        var restaurants = response.restaurants;
        console.log(address, restaurants);
        });
        
    },
    
};

app.initialize();
