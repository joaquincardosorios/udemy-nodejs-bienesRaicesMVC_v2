(function() {
    const lat = document.querySelector('#lat').value || -36.82675787129675;
    const lng = document.querySelector('#lng').value || -73.0399261262165;
    const mapa = L.map('mapa').setView([lat, lng ], 13);
    let marker;

    //Utilizar Provier y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // El pin
    marker = new L.marker([lat,lng],{
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    // Detectar el mov del pin
    marker.on('moveend', function(e){
        marker = e.target;
        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        // Obtener informacion de la calle al soltar el pin
        geocodeService.reverse().latlng(posicion,13).run(function(error, resultado) {
            // console.log(resultado)
            marker.bindPopup(resultado.address.LongLabel)

            //Llenar los campos
            document.querySelector('.calle').textContent= resultado?.address?.Address ?? '';
            document.querySelector('#calle').value= resultado?.address?.Address ?? '';
            document.querySelector('#lat').value= resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value= resultado?.latlng?.lng ?? '';
        })
    })

})()
