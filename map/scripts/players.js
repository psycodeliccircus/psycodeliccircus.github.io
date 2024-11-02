const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

// Definindo o sistema de coordenadas personalizado
const CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoomLevel) {
    return Math.pow(2, zoomLevel);
  },
  zoom: function (scale) {
    return Math.log(scale) / 0.6931471805599453; // 0.6931471805599453 é o valor de ln(2)
  },
  distance: function (point1, point2) {
    const deltaX = point2.lng - point1.lng;
    const deltaY = point2.lat - point1.lat;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true
});

// Definindo o estilo do mapa satélite
const SateliteStyle = L.tileLayer("tiles/{z}/{x}/{y}.jpg", {
  minZoom: 0,
  maxZoom: 8,
  noWrap: true,
  continuousWorld: false,
  attribution: "FIVEMDEV MAP",
  id: "SateliteStyle map"
});

// Configurações do mapa
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

// Atualizando os ícones do mapa a cada segundo
setInterval(() => {
  $.post("https://fdev-carcontrol/getBlips", {}, function (blipData) {
    // Removendo os ícones existentes no mapa
    zero_resmon_map.eachLayer(layer => {
      if (layer._latlng != undefined) {
        layer.remove();
      }
    });

    // Ícone para os amigos
    const friendIcon = blipData.icon;
    for (let i = 0; i < blipData.friends.length; i++) {
      const iconOptions = {
        iconUrl: friendIcon,
        iconSize: [32, 32],
        iconAnchor: [50, 35]
      };
      const friendMarker = L.marker([blipData.friends[i].y, blipData.friends[i].x], {
        icon: L.icon(iconOptions)
      });
      friendMarker.addTo(zero_resmon_map);
    }

    // Ícone para o próprio jogador
    const playerMarker = L.marker([blipData.me.y, blipData.me.x], {
      icon: L.icon({
        iconUrl: "navi.png",
        iconSize: [40, 50],
        iconAnchor: [50, 35]
      })
    });
    playerMarker.addTo(zero_resmon_map);
  });
}, 1000);
