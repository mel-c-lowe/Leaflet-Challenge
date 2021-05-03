var myMap = L.map("mapid", {
    center: [30.00, 30.00],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

  d3.json(earthquake_url).then(function(data) {
    //   console.log(data)

    // Drill down to get coordinates
    var earthquakes = data.features;
    // console.log(earthquakes);

    // Set color scheme for earthquake magnitude
    var greater = "red";
    var lesser = "green";

    for (var i = 0; i < earthquakes.length; i++) {
        var lat = earthquakes[i].geometry.coordinates[1];
        var long = earthquakes[i].geometry.coordinates[0];
        var depth = earthquakes[i].geometry.coordinates[2];
        var mag = earthquakes[i].propoerties.mag;

        // Testing that markers are working with data as drawn above (working)
        // L.marker([lat, long]).addTo(myMap);

        // Testing rule for greater and lesser magnitude colors
        var fillColor;
        if (mag > 2) {
            fillColor = greater;
        }
        else if (mag > 2) {
            fillColor = lesser;
        }

        // Describe circle/marker for each earthquake
        var quakePoint = L.circleMarker([lat, long], {
            radius: mag ** 2,
            fillColor: fillColor,
        });

    };
      

  });