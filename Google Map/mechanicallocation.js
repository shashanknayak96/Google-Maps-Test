// https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyCDcA1Z5_0IfX6XYz7f5nI0rVs7S136DIY

fname = localStorage.getItem('fname');
lname = localStorage.getItem('lname');
address = localStorage.getItem('address');
number = localStorage.getItem('number');
email = localStorage.getItem('email');
password = localStorage.getItem('cpassword');
shopname = localStorage.getItem('shopname');
servicetype = localStorage.getItem('servicetype');
vehicletype = localStorage.getItem('vehicletype');
// alert(a);
var slat, slng;
var tester = 0;
var pos;
var mapDiv = document.getElementById('map');
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        draggable: true,
        panControl: false,
        scrollwheel: false,
        zoomControl: false,
        zoomControlOptions: false,
        streetViewControl: false,
        mapTypeControl: false,
        center: { lat: 19.397, lng: 72.644 }
    });
    var input = document.getElementById('userInput');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29)
    });
    
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        //  marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                draggable: true,
                panControl: false,
                scrollwheel: false,
                zoomControl: false,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false,

            });

            map.fitBounds(place.geometry.viewport);
            map.setZoom(18);
            map.setCenter(place.geometry.location);
            var marker = new google.maps.Marker(
                {
                    position: place.geometry.location,
                    map: map,
                    draggable: true
                    
                });
                slat = place.geometry.location.lat();
                slng = place.geometry.location.lng();
                localStorage.setItem("Latitude", slat);
                localStorage.setItem("Longitude", slng);
                console.log(localStorage.getItem('Latitude'));
                console.log(localStorage.getItem('Longitude'));
                tester = 1;
 
            google.maps.event.addListener(marker, 'drag', function () {
                slat = marker.position.lat();
                slng = marker.position.lng();
                localStorage.setItem("Latitude", slat);
                localStorage.setItem("Longitude", slng);
                console.log(localStorage.getItem('Latitude'));
                console.log(localStorage.getItem('Longitude'));
                tester = 1;
            });
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
        }


        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        //	marker.draggable(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);


    });


    var geocoder = new google.maps.Geocoder();
    //Find the location

    //Current location

}
document.getElementById('currentLocation').addEventListener('click', function () {
    test(map);
});
document.getElementById('nextOtp').addEventListener('click',function(){
    if(tester == 1){
        $.ajax({
            url:'text.php',
            success:function(result){
                
            }
        });
    }else{
        alert("Please select your location!");
    }
})
//google.maps.event.addDomListener(window, 'load', init);
function test(map1) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
            //alert(myLatlng);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                draggable: true,
                panControl: false,
                scrollwheel: false,
                zoomControl: false,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false,

            });
            map.setCenter(pos);

            var marker = new google.maps.Marker(
                {
                    position: myLatlng,
                    map: map
                });
            slat = pos.lat;
            slng = pos.lng;
            localStorage.setItem("Latitude", slat);
            localStorage.setItem("Longitude", slng);
            console.log(localStorage.getItem('Latitude'));
            console.log(localStorage.getItem('Longitude'));
            tester = 1;
        });
    }
}








