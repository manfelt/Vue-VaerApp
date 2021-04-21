export default { 
    
    // Henter geografiske koordinater(bredde -lengdegrad), gitt 'stedsNavn' parameteren.
    // 'breddeInteger', 'lengdeInteger' lagrer verdien av koordinater, omgjort til integer, kortet ned ant. desimaler til 2.
    hentGeoKoordinater(stedsNavn) {
        fetch(`https://nominatim.openstreetmap.org/search?q=${stedsNavn}&format=geojson`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log("hentGeokoordinater OK")
            let koordinater = [];
            let breddegrad = response.features[0].geometry.coordinates[0].toFixed(2);
            let lengdegrad = response.features[0].geometry.coordinates[1].toFixed(2);
            koordinater.push({
                0: breddegrad,
                1: lengdegrad
            });
            console.log(koordinater[0][0], koordinater[0][1]);
            return koordinater;
        })
        .then(this.setResults);
    }
}