(function(){
    const lat = -36.82675787129675;
    const lng = -73.0399261262165;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
})()