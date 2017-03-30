var lat;
var lng;
    

function initMap() {

$.ajax({
        url: 'shop.php',
        async: false,
        type: 'json',
        success: function (result) {
          var a = JSON.parse(result);
          document.getElementById('shopName').innerHTML = a['sname'];
          document.getElementById('address').innerHTML = a['address'];
          document.getElementById('contactno').innerHTML = a['contact_no'];
          document.getElementById('servicetype').innerHTML = a['servicetype'];
          document.getElementById('vechicletype').innerHTML = a['vechicletype'];
          lat = a['lat'];
          lng = a['lng'];
document.getElementById('visible').className = "show";
        
      }
      });

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        draggable: true,
        panControl: false,
        scrollwheel: false,
        zoomControl: false,
        zoomControlOptions: false,
        streetViewControl: false,
        mapTypeControl: false,
        center: new google.maps.LatLng(lat, lng)
    });
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
    });
}
