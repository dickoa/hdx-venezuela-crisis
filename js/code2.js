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
        fillColor: '#D3D3D3',
        weight: 2,
        opacity: 0.6,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.75
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

function getColor(d) {
  return d > 600000 ? '#440154ff' :
    d > 300000 ? '#46307cff' :
    d > 150000 ? '#375a8cff' :
    d > 50000 ? '#287d8eff' :
    d > 20000 ? '#24a086ff' :
    d > 10000 ? '#4cc06cff' :
    d > 2500 ? '#9ed93aff' :
    '#fde725ff';

function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
});
if (feature.properties.destination == 'yes') {
    layer.bindPopup('<h4><strong>' + feature.properties.name + '</strong></h4><h5>Number of people from Venezuela: <b>' + numeral(feature.properties.venezuelan).format('0,0') + '</b></h5>');
} else {
    layer.bindPopup('<h4><strong>' + feature.properties.name + '</strong></h4>');
}
}

function onEachFeatureMiniMap(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
});
if (feature.properties.destination == 'yes') {
    layer.bindPopup('<h6><strong>' + feature.properties.name + '</h6>' + numeral(feature.properties.venezuelan).format('0a) + '</b></p>');
} else {
    layer.bindPopup('<p class="small"><strong>' + feature.properties.name + '</strong></p>');
}
}

var map = L.map('map', {
maxZoom: 5,
minZoom: 2
});

map.setView([4, -66], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
attribution: '<a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

var geojson;
var legend = L.control({
position: 'bottomleft'
});

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

function getColor2(d) {
  return d === 'More than 500,000' ? "#440154ff" :
    d === 'Between 200,000 and 500,000' ? "#46307cff" :
    d === 'Between 50,000 and 200,000' ? "#287d8eff" :
    d === 'Between 10,000 and 50,000' ? "#4cc06cff" :
    "#fde725ff";


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


function generateMiniMaps() {
    // minimap Aruba
    var arubaMap = L.map('miniMap1',{
        maxZoom: 16,
        miniZoom: 12
    });

    arubaMap.setView([12.52,-69.95], 9); // Aruba OSM coord 12.5291/-69.9560

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg'
        ).addTo(arubaMap);

    var geojson;

    geojson = L.geoJson(aru, {
    style: style,
    onEachFeature: onEachFeatureMiniMap
    }).addTo(arubaMap);

    //minimap curacao 
        var curacaoMap = L.map('miniMap2',{
        maxZoom: 16,
        miniZoom: 12
    });

    curacaoMap.setView([12.18,-68.95], 9); // Curacao OSM coord 11/12.1839/-68.9605

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg'
        ).addTo(curacaoMap);

    var geojson;

    geojson = L.geoJson(cur, {
    style: style,
    onEachFeature: onEachFeatureMiniMap
    }).addTo(curacaoMap);

    //minimap trinidad 
        var trinidadMap = L.map('miniMap3',{
        maxZoom: 16,
        miniZoom: 12
    });

    trinidadMap.setView([10.5,-61.39], 7); // Trinidad OSM coord 10.5069/-61.3924

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg'
    ).addTo(trinidadMap);

    var geojson;

    geojson = L.geoJson(tri, {
    style: style,
    onEachFeature: onEachFeatureMiniMap
    }).addTo(trinidadMap);

} // end of generateMiniMaps

$('document').ready(function(){
    generateMiniMaps();
    $('.miniMap .leaflet-control-attribution').hide();
    $('.miniMap .leaflet-control-zoom').hide();
});