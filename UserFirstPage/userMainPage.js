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
        center: { lat: 19.397, lng: 72.644 },
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
            map.setCenter(pos);
            var marker = new google.maps.Marker(
                {
                    position: myLatlng,
                    map: map
                });

        });

    }
}
$(document).ready(function () {
    clicks = 0;
    $('.spinButton').click(function () {
        var image = document.getElementById('spinButton');
        image.setAttribute("class", "rotated-image");
        setTimeout(function () {
            image.removeAttribute("class", "rotated-image");
            window.location.href = "https://google.com";
        }, 2000);
    })
    $('.bar').click(function () {
        clicks += 1;
        setTimeout(function () {
            clicks = 0;
        }, 2000)
        if (clicks == 2) {
            alert("HELP");
            navigator.geolocation.getCurrentPosition(showPosition);
            function showPosition(position) {
                message = "sms://0000?body=";
                message += "I am in need of help! ";
                message += "http://maps.google.com/maps?q=loc:";
                message += position.coords.latitude;
                message += ",";
                message += position.coords.longitude;
                console.log(message);
                document.getElementById("smsHelp").setAttribute("href", message);
            }
        }
    });
});
