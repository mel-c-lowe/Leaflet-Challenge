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
  var alt_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Set up color scheme for depth of earthquakes
var colors = {
    level_0: '#3c0',
    level_1: '#9f6',
    level_2: '#fc3',
    level_3: '#f93',
    level_4: '#c60',
    level_5: '#c00'
}



// Read json and print data  
d3.json(alt_url).then(function(data) {
    console.log(data);

    // Drill down for coordinates
    var earthquakes = data.features;

    // For loop through json for datapoints needed
    for (var i = 0; i < earthquakes.length; i++) {
        var lat = earthquakes[i].geometry.coordinates[1];
        var long = earthquakes[i].geometry.coordinates[0];
        var depth = earthquakes[i].geometry.coordinates[2];
        var mag = earthquakes[i].properties.mag;

        // Select color of circle based on magnitude
        var fillColor;
        if (depth > 50) {
            fillColor = colors.level_5;
        } else if (depth > 40) {
            fillColor = colors.level_4;
        } else if (depth > 30) {
            fillColor = colors.level_3;
        } else if (depth > 20) {
            fillColor = colors.level_2;
        } else if (depth > 10) {
            fillColor = colors.level_1;
        } else if (depth > 1) {
            fillColor = colors.level_0;
        }

        var circle = L.circleMarker([lat, long], {
            radius: mag * 2,
            fillColor: fillColor,
            color: "black",
            fillOpacity: 1,
            weight: 1
        });
        circle.addTo(myMap);

        // Add a popup on click
        circle.bindPopup("Location: " + earthquakes[i].properties.place + "<br> Was this earthquake felt? " + earthquakes[i].properties.felt);
        
    };
});

/* Setting the legend to appear in the bottom right of our chart */
var legend = L.control({
position: 'bottomright'
});

/* Adding on the legend based off the color scheme we have */
legend.onAdd = function (color) {
    var div = L.DomUtil.create('div', 'info legend');
    var levels = ["> 1", "> 10",  "> 20", "> 30", "> 40", "> 50"];
    var colors = ['#3c0', '#9f6', '#fc3', '#f93', '#c60', '#c00']
    for (var i = 0; i < levels.length; i++) {
        div.innerHTML += '<i style="background:' + colors[i] + '"></i>' + levels[i] + '<br>';
    }
    return div;
}
legend.addTo(myMap);





