export default {
    // Henter samtidig værdata fra API, ordner data i objekter.
    hentSamtidsVaerData(breddegrad, lengdegrad) {
        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${breddegrad}&lon=${lengdegrad}`, {mode: 'cors'})
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response.properties.timeseries[0].data.instant.details.air_temperature, response.properties.timeseries[0].data.next_1_hours.summary.symbol_code, response.properties.timeseries[0].data.instant.details.wind_speed)
                return {
                    temperatur: response.properties.timeseries[0].data.instant.details.air_temperature,
                    forhold: response.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
                    nedbor: response.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
                    vindRetning: response.properties.timeseries[0].data.instant.details.wind_from_direction,
                    vindHastighet: response.properties.timeseries[0].data.instant.details.wind_speed
                };
            })
            .catch(e => {
                console.log(e, "Feil i spørring, samtidsVær.");
            });
    },
    // Henter neste timers data, lagrer data inn i 'dokumenter' variabelen.
    // Iterativ funskjon lagrer flere ulike dataobjekter(data for neste timer) gitt 'antallDokument' parameteren.
    hentNesteTimersVaerData(breddegrad, lengdegrad, antallDokument) {
        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${breddegrad}&lon=${lengdegrad}`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log("hentNesteTimersVærInfo OK", response.properties.timeseries[0].data.instant.details.air_temperature);
            let dokumenter = [];
            for(let i = 0; i < antallDokument;i++)
                dokumenter.push({
                    tid: response.properties.timeseries[i].time,
                    temperatur: response.properties.timeseries[i].data.instant.details.air_temperature,
                    forhold: response.properties.timeseries[i].data.next_1_hours.summary.symbol_code,
                    nedbor: response.properties.timeseries[i].data.next_1_hours.details.precipitation_amount
                });
            console.log(dokumenter);
            return dokumenter;
            })
        .catch(e => {
            console.log(e, "Feil i spørring, nesteTimersVær.");
        });
    }
}
