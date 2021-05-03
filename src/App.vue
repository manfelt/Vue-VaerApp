<template>
  <div id="app">
    <main>
      <div class="søk-boks">
        <input type="text"
          class="søk-bar"
          placeholder="Søk..."
          v-model="query"
          @keypress="skaffVaer"/>
      </div>
      

      <div class="vaer-wrap">
        <div class="sted-boks">
          <div class="sted">{{ query }}</div>
          <div class="sted">{{ Vaer }}</div>
          <div class="sted">{{ koordinater }}</div>
            <div class="dato">{{ byggDato() }}</div>
        </div>
      </div>

      <div class="content">
        <div class="content-grid">
          {{ setResult }}
        </div>
      </div>  
    </main>
  </div>
</template>

<script>
  
	import VaerApi from './adapter'
  import Kort from './Kort'
  import Geografi from './koordinaterAdapter'
  Kort

export default {
  name: 'App',
  Components: {
    VaerApi,
    Geografi,
  },
  data() {
    return {
      query: '',
      Vaer: '',
      koordinater: []
    }
  },
    //{0: "10.74", 1: "59.91"}
    methods: {
        skaffVaer  (e)  {
        var koordinater = this.koordinater
        if (e.key == "Enter") {
           koordinater = Geografi.hentGeoKoordinater(this.query);
                  fetch(`https://nominatim.openstreetmap.org/search?q=${this.query}&format=geojson`, {mode: 'cors'})
                  .then(function(response) {
                      return response.json();
                  })
                  .then(function(response) {
                      console.log("hentGeokoordinater OK")
                      koordinater = [];
                      let breddegrad = response.features[0].geometry.coordinates[0].toFixed(2);
                      let lengdegrad = response.features[0].geometry.coordinates[1].toFixed(2);
                      koordinater  = ({
                          breddegrad: breddegrad,
                          lengdegrad: lengdegrad
                      });
                     
                      fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${koordinater.breddegrad}&lon=${koordinater.lengdegrad}`, {mode: 'cors'})
                          .then(function(response) {
                              return response.json();
                          })
                          .then(function(response) {
                              console.log("SamtidsVaerData OK:", response.properties.timeseries[0].data.instant.details.air_temperature, response.properties.timeseries[0].data.next_1_hours.summary.symbol_code, response.properties.timeseries[0].data.instant.details.wind_speed)
                              return {
                                  temperatur: response.properties.timeseries[0].data.instant.details.air_temperature,
                                  forhold: response.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
                                  nedbor: response.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
                                  vindRetning: response.properties.timeseries[0].data.instant.details.wind_from_direction,
                                  vindHastighet: response.properties.timeseries[0].data.instant.details.wind_speed
                              };
                          })
                  })
                  .catch(e => {
                      console.log(e, "Feil i spørring, hentGeokoordinater.")
                  });
              

        }
      },
          setResults (koordinater)  {
          this.Vaer = VaerApi.hentSamtidsVaerData(koordinater);
          console.log('this.Vaer');
        },
           byggDato  ()  {
          let d = new Date();
          let dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
          let maaneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

          let dag = dager[d.getDay()];
          let dato = d.getDate();
          let maaned = maaneder[d.getMonth()];

          return `${dag} ${dato} ${maaned}`;
        }
    }
}


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Circular', "apercu", system, sans-serif;
}

#app {
  background-image: url('./assets/fjell.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  transition: 0.5s;
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.søk-boks {
  width: 100%;
  margin-bottom: 30px;
}
.søk-boks .søk-bar {
  padding: 6px 27px 6px 12px;
  cursor: pointer;
  border-radius: 13px 13px 13px 13px;

  display: block;
  width: 100%;
  color:#400000;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;

  background-color: rgba(255, 255, 255, 0.15);
  transition: 0.5s;
  border-radius: 5px;
}

</style>
