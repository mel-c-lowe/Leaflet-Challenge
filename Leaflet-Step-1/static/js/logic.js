var myMap = L.map("mapid", {
    center: [37.7749, -122.4194],
    zoom: 13
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

  d3.json(earthquake_url).then(function(earthquakes) {
      console.log(earthquakes)

    // Loop through geojson to get data for markers
    for (var i = 0; i < earthquakes.length; i++) {
        var geometry = earthquakes[i].geometry;

        if (geometry) {
            L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(myMap);
          }
        }
      

  });