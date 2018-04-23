var map = L.map('map',
		{
		  maxZoom: 5,
		  minZoom: 2
		});

map.setView([4, -66], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
  attribution: '<a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

var geojson;

function getColor(d) {
  return d > 600000 ? '#800026' :
    d > 300000  ? '#BD0026' :
    d > 150000  ? '#E31A1C' :
    d > 50000  ? '#FC4E2A' :
    d > 20000   ? '#FD8D3C' :
    d > 10000   ? '#FEB24C' :
    d > 2500   ? '#FED976' :
    '#FFEDA0';
}

function highlightFeature(e) {
  var layer = e.target;
  
  layer.setStyle({
    weight: 5,
    // color: '#ff4000', //'#3182bd', //'#666',
    //dashArray: '',
    //fillOpacity: 0.7
  });
  
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  layer.bindPopup('<h4>' + feature.properties.name + '</h4><h5>Number of people from Venezuela: ' + feature.properties.venezuelan + '</a></h5>');
}  

function style(feature) {
  if (feature.properties.destination == 'yes') {
    return {
      fillColor: getColor(feature.properties.venezuelan),
      weight: 2,
      opacity: 0.6,
      color: 'white',
      fillOpacity: 0.5
    };
  } else if (feature.properties.destination == 'no') {
    return {
      fillColor: '#006837',
      weight: 2,
      opacity: 0.6,
      color: 'white',
      //dashArray: '3',
      fillOpacity: 0.5
    };
  }
  
}


geojson = L.geoJson(crisis, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);
