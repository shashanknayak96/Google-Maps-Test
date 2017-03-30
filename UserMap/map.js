
function initMap() {
    $(document).ready(function () {
        var d = new Date();
        var hours = d.getHours();
        var currentLatLng;
        var iconBase = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            currentLatLng = new google.maps.LatLng(currentPos.lat, currentPos.lng);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                draggable: true,
                panControl: false,
                scrollwheel: false,
                zoomControl: false,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false,
                center: currentLatLng
            });

            currentMarker = new google.maps.Marker({
                position: currentLatLng,
                icon: iconBase,
                map: map
            });
            currentMarker.setZIndex(999);
            localStorage.setItem('currentLatitude', currentPos.lat);
            localStorage.setItem('currentLongitude', currentPos.lng);
            console.log(localStorage.getItem('currentLatitude'));
            console.log(localStorage.getItem('currentLongitude'));

            //PASS RADIO BUTTON VALUE
            tyre = "all";
            $('#filter').click(function () {
                document.getElementById('nearDivs').innerHTML = "";

                var tyre = document.getElementsByName('group1');
                for (i = 0; i < tyre.length; i++) {
                    if (tyre[i].checked) {
                        tyre = tyre[i].value;
                    }
                }

                var result1 = $.parseJSON($.ajax({
                    url: 'map.php',
                    data: "tyre=" + tyre,
                    type: 'post',
                    async: false,
                    success: function (res) {
                        console.log(res);
                    }
                }).responseText);
                console.log(result1);
                var marker, infowindow;
                var i, j;
                var objects = []; 6
                for (i = 0; i < result1.length; i++) {
                    targetLat = result1[i][0][10];
                    targetLng = result1[i][0][11];
                    targetLoc = new google.maps.LatLng(targetLat, targetLng);
                    center = currentLatLng;
                    dist = google.maps.geometry.spherical.computeDistanceBetween(center, targetLoc);
                    distanceInkm = dist / 1000;
                    if (distanceInkm < 0.5) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(result1[i][0][10], result1[i][0][11]),
                            map: map
                        });
                        $.ajax({
                            url: 'mapDiv.php',
                            data: { 'table': result1[i][0], 'distance': distanceInkm, 'currentTime': hours, 'openTime': result1[i][0][13], 'closeTime': result1[i][0][14] },
                            type: 'post',
                            async: false,
                            success: function (answer) {
                                document.getElementById('nearDivs').innerHTML += answer;
                            }
                        });
                    }
                }
            });
            var result1 = $.parseJSON($.ajax({
                url: 'map.php',
                data: "tyre=" + tyre,
                async: false,
                type: 'post'
            }).responseText);
            console.log(result1);
            var marker, infowindow;
            var i, j;
            var objects = [];
            for (i = 0; i < result1.length; i++) {
                targetLat = result1[i][0][10];
                targetLng = result1[i][0][11];
                targetLoc = new google.maps.LatLng(targetLat, targetLng);
                center = currentLatLng;
                dist = google.maps.geometry.spherical.computeDistanceBetween(center, targetLoc);
                distanceInkm = dist / 1000;
                if (distanceInkm < 0.5) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(result1[i][0][10], result1[i][0][11]),
                        map: map
                    });
                    $.ajax({
                        url: 'mapDiv.php',
                        data: { 'table': result1[i][0], 'distance': distanceInkm, 'currentTime': hours, 'openTime': result1[i][0][13], 'closeTime': result1[i][0][14] },
                        type: 'post',
                        async: false,
                        success: function (answer) {
                            document.getElementById('nearDivs').innerHTML += answer;
                        }
                    });
                }
            }
        });
    });
}