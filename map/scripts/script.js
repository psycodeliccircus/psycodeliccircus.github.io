// Configuração do centro e escala do mapa
const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

// Configurando o sistema de coordenadas personalizado
const CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoomLevel) {
    return Math.pow(2, zoomLevel);
  },
  zoom: function (scale) {
    return Math.log(scale) / 0.6931471805599453; // log base 2
  },
  distance: function (point1, point2) {
    const deltaX = point2.lng - point1.lng;
    const deltaY = point2.lat - point1.lat;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true
});

// Configuração do estilo do mapa satélite
const SateliteStyle = L.tileLayer("tiles/{z}/{x}/{y}.jpg", {
  minZoom: 0,
  maxZoom: 8,
  noWrap: true,
  continuousWorld: false,
  attribution: "FIVEMDEV MAP",
  id: "SateliteStyle map"
});

// Opções de inicialização do mapa
const mapOptions = {
  crs: CUSTOM_CRS,
  minZoom: 1,
  maxZoom: 5,
  zoom: 5,
  maxNativeZoom: 5,
  preferCanvas: true,
  layers: [SateliteStyle],
  center: [0, 0]
};

// Inicializando o mapa
const zero_resmon_map = L.map("map", mapOptions);

// Atualizando a posição do marcador no mapa a cada segundo
setInterval(() => {
  $.post("https://fdev-carcontrol/getCoors", {}, function (coords) {
    // Removendo marcadores existentes
    zero_resmon_map.eachLayer(layer => {
      if (layer._latlng !== undefined) {
        layer.remove();
      }
    });

    // Adicionando o novo marcador com as coordenadas recebidas
    const playerMarker = L.marker([coords.y, coords.x], {
      icon: L.icon({
        iconUrl: "navi.png",
        iconSize: [40, 50],
        iconAnchor: [50, 35]
      })
    });
    playerMarker.addTo(zero_resmon_map);

    // Logando as coordenadas no console
    console.log(coords, "yok");

    // Centralizando a visão do mapa no novo marcador
    zero_resmon_map.setView([coords.y, coords.x], 12);
  });
}, 1000);
