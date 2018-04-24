var map = L.map('map', {
  maxZoom: 5,
  minZoom: 2
});

map.setView([-17.5, -60], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
  attribution: '<a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

var geojson;

function getColor2(d) {
  return d === 'More than 500,000' ? "#440154ff" :
    d === 'Between 200,000 and 500,000' ? "#46307cff" :
    d === 'Between 50,000 and 200,000' ? "#287d8eff" :
    d === 'Between 10,000 and 50,000' ? "#4cc06cff" :
    "#fde725ff";
}

var legend = L.control({
  position: 'bottomleft'
});

function getColor(d) {
  return d > 600000 ? '#440154ff' :
    d > 300000 ? '#46307cff' :
    d > 150000 ? '#375a8cff' :
    d > 50000 ? '#287d8eff' :
    d > 20000 ? '#24a086ff' :
    d > 10000 ? '#4cc06cff' :
    d > 2500 ? '#9ed93aff' :
    '#fde725ff';
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
  if (feature.properties.destination == 'yes') {
    layer.bindPopup('<h4><strong>' + feature.properties.name + '</strong></h4><h5>Affected people from Venezuela: <b>' + numeral(feature.properties.venezuelan).format('0a') + '</b></h5>');
  } else {
    layer.bindPopup('<h4><strong>' + feature.properties.name + '</strong></h4>');
  }
}

function style(feature) {
  if (feature.properties.destination == 'yes') {
    return {
      fillColor: getColor(feature.properties.venezuelan),
      weight: 2,
      opacity: 0.5,
      color: 'white',
      fillOpacity: 0.75
    };
  } else if (feature.properties.destination == 'no') {
    return {
      fillColor: '#FEB24C',
      weight: 2,
      opacity: 0.6,
      color: 'white',
      //dashArray: '3',
      fillOpacity: 0.8
    };
  } else if (feature.properties.destination == 'bg') {
    return {
      fillColor: '#D3D3D3',
      weight: 2,
      opacity: 1,
      color: 'white',
      //dashArray: '3',
      fillOpacity: 1
    };
  }
}


geojson = L.geoJson(crisis, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);


legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  labels = ['<strong>Affecte people from Venezuela</strong><br>'],
  categories = ['More than 500,000', 'Between 200,000 and 500,000', 'Between 50,000 and 200,000', 'Between 10,000 and 50,000', 'Less than 10,000'];

  for (var i = 0; i < categories.length; i++) {

    div.innerHTML +=
      labels.push(
        '<i style="background:' + getColor2(categories[i]) + '"></i> ' + categories[i] + '<br>');

  }
  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
