function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);
    $(document).ready(function(){
   
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    // var onChangeHandler = function () {
    //     calculateAndDisplayRoute(directionsService, directionsDisplay);
    // };
    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: new google.maps.LatLng(19.38543521186268, 72.82346256242681),
        destination: new google.maps.LatLng(19.385678105765756, 72.82514162527013),
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}