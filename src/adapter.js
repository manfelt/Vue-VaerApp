
export default {
    hentSamtidsVærInfo(breddegrad, lengdegrad) {

        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${breddegrad}&lon=${lengdegrad}`, {mode: 'cors'})
            .then(function(response) {
                return response.json();
        })
        .then(function(response) {
            return {
                temperatur: response.timeseries[0].data.instant.details.air_temperature,
                kondisjon: response.timeseries[0].data.next_1_hours.summary.symbol.code,
                nedbør: response.timeseries[0].data.next_1_hours.details.precipitation_amount,
                vindRetning: response.timeseries[0].data.instant.details.wind_from_direction,
                vindHastighet: response.timeseries[0].data.instant.details.wind_speed
            };
        })
        .catch(e => {
            console.log(e, "Feil i spørring");
        });
    },
    hentNesteTimersVærInfo(breddegrad, lengdegrad)
}
