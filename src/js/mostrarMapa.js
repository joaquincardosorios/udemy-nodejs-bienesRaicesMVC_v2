(function() {
    const lat = document.getElementById('lat').textContent
    const lng = document.getElementById('lng').textContent
    const calle = document.getElementById('calle').textContent
    const mapa = L.map('mapa').setView([lat, lng], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Agregar el pin
    L.marker([lat,lng])
        .addTo(mapa)
        .bindPopup(calle)
})()