function initMap() {
    selectedDiv1 = localStorage.getItem('selectedDiv');
    userLat = localStorage.getItem('currentLatitude');
    userLng = localStorage.getItem('currentLongitude');
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);
    $.ajax({
        data: "id=" + selectedDiv1,
        type: 'POST',
        url: 'routeMap.php',
        async: false,
        success: function (result) {
            result1 = JSON.parse(result);
            document.getElementById('shopName').innerHTML = result1[0][0][5];
            document.getElementById('address').innerHTML = result1[0][0][6];
            document.getElementById('contactno').innerHTML = result1[0][0][3];
            document.getElementById('servicetype').innerHTML = result1[0][0][7];
            document.getElementById('vehicletype').innerHTML = result1[0][0][8];
            document.getElementById('towingcontact').innerHTML = result1[0][0][12];
            document.getElementById('timing').innerHTML = "" + result1[0][0][13] + ":00 hrs-" + result1[0][0][14] + ":00 hrs";
            console.log(result1);
        }
    });
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: new google.maps.LatLng(userLat, userLng),
        destination: new google.maps.LatLng(result1[0][0][10], result1[0][0][11]),
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}