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
    console.log(data);

    // Drill down for coordinates
    var earthquakes = data.features;

    // Set up color scheme for magnitude
    var colors = {
        level_1: "#8B0000",
        level_2: "#FF4500",
        level_3: "#FFA500",
        level_4: "#FFFF00",
        level_5: "#9ACD32"
    }

    // For loop through json for datapoints needed
    for (var i = 0; i < earthquakes.length; i++) {
        var lat = earthquakes[i].geometry.coordinates[1];
        var long = earthquakes[i].geometry.coordinates[0];
        var mag = earthquakes[i].properties.mag;

        // Select color of circle based on magnitude
        var fillColor;
        if (mag > 5) {
            fillColor = colors.level_1;
        } else if (mag > 4) {
            fillColor = colors.level_2;
        } else if (mag > 3) {
            fillColor = colors.level_3;
        } else if (mag > 2) {
            fillColor = colors.level_4;
        } else if (mag > 1) {
            fillColor = colors.level_5;
        }

        var circle = L.circleMarker([lat, long], {
            radius: mag ** 2,
            fillColor: fillColor,
            color: "black",
            fillOpacity: 1,
            weight: 1
        });
        circle.addTo(myMap);
    };
});
