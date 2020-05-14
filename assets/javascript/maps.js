function initMap() {
  let coordenadas = {
    lat: -34.64616605461921,
    lng: -58.42115163803101,
  };

  let mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: coordenadas,
    zoom: 16,
  });

  //marcador
  let marker = new google.maps.Marker({
    position: coordenadas,
    mapa,
    title: "Muebles Caceros",
  });
}

initMap();
