<template>
  <div id="app">
    <main> 

      <div class="søk-boks">
        <input type="text"
          class="søk-bar"
          placeholder="Søk sted..."
          v-model="query"
          @keypress="skaffVaer"/>
      </div>
      
      <kort-view v-if="state">
      <div class="vaer-wrap">
          <div class="dato">{{ byggDato() }}</div>

          <br>

          <div class="sted-boks">

          <div class="sted"><h1>{{ sted }}</h1></div>
          <div class="sted">{{ temperatur }} ℃</div>
          <div class="sted">{{ forhold }}</div>

          <br>

          <h2>Nedbør</h2>
          <div class="sted">{{ nedbor }} mm</div>

          <br>

          <h2>Vind</h2>
          <img class="vind-retning" :src="skaffHimmelretning">
          <div class="sted">{{ vindHastighet }} m/s</div>

          <VaerForholdBilde 
            :class='vaerForholdMedium' 
            :passendeVaerGrafikk='forhold'
          />

          <div class="vaer-forhold-medium">
            <img :src="passendeVaerGrafikk" />
          </div>

        </div>
      </div>
      </kort-view>

      <div class="beskrivelse">
        <p>Data er hentet via meteorologisk institutts API: <a href="https://api.met.no">https://api.met.no</a></p>
        <p>Input til meteorologisk institutts koordinatsystem skaffes via openstreetmaps API, 'nominatim'. </p>
      </div>
     
    </main>
  </div>
</template>

<script>


  // Mapper grafikk fra værfohold. (Dvs, 'regn' vil gi 'regn.svg'.)
let vaerForholdTilGrafikkMap = {
	'clearsky_day': require('./assets/ikoner/01d.svg'),
	'clearsky_night': require('./assets/ikoner/01n.svg'),
	'cloudy': require('./assets/ikoner/04.svg'),
	'few_clouds': require('./assets/ikoner/02d.svg'),
	'fair_day': require('./assets/ikoner/02d.svg'),
  'fair_night': require('./assets/ikoner/02n.svg'),
	'partlycloudy_day': require('./assets/ikoner/03d.svg'),
	'partlycloudy_night': require('./assets/ikoner/03n.svg'),
	'rain': require('./assets/ikoner/09.svg'),
  'heavyrain': require('./assets/ikoner/10.svg'),
  'lightrain': require('./assets/ikoner/10.svg')
}


  import Geografi from './koordinaterAdapter';
  import VaerForholdBilde from './ForholdTilGrafikk';
  import Kort from './Kort';


export default {
 el: '#app',
  components: {
    'VaerForholdBilde':VaerForholdBilde,
    'kort-view': Kort
  },
  data() {
    return {
      query: '',
      koordinater: [],
      sted: '',
      temperatur: 'tmp',
      forhold: 'rain',
      nedbor: '',
      vindRetning: 0,
      vindHastighet: 'vindHastighet',
      bilde: 'cloudy.svg',
      state: false
    }
  },
    //{0: "10.74", 1: "59.91"}
    methods: {
        skaffVaer  (e)  {
        var koordinater = this.koordinater
        if (e.key == "Enter") {
           this.koordinater = Geografi.hentGeoKoordinater(this.query);
           // Gjør at første bokstav i stedsnavn er storbokstav.
           this.sted = this.query.charAt(0).toUpperCase() + this.query.slice(1);

                  // Henter samtidig værdata fra API, ordner data i objekter.
                  fetch(`https://nominatim.openstreetmap.org/search?q=${this.query}&format=geojson`, {mode: 'cors'})
                  .then(function(response) {
                      return response.json();
                  })
                  .then((response) => {
                      console.log("hentGeokoordinater OK")
                      koordinater = [];
                      let breddegrad = response.features[0].geometry.coordinates[0].toFixed(2);
                      let lengdegrad = response.features[0].geometry.coordinates[1].toFixed(2);
                      koordinater  = ({
                          breddegrad: breddegrad,
                          lengdegrad: lengdegrad
                      });

                      // værdata fra meteorologisk institutt. IKKE BRUK MER ENN 4 DESIMALER!
                      fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${koordinater.lengdegrad}&lon=${koordinater.breddegrad}`, {mode: 'cors'})
                          .then(function(response) {
                              return response.json();
                          })
                          .then((response) => {
                              console.log("SamtidsVaerData OK:", response.properties.timeseries[0].data.instant.details.air_temperature, response.properties.timeseries[0].data.next_1_hours.summary.symbol_code, response.properties.timeseries[0].data.instant.details.wind_speed)
                              this.temperatur = response.properties.timeseries[0].data.instant.details.air_temperature
                              this.forhold = response.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
                              this.nedbor = response.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
                              this.vindRetning = response.properties.timeseries[0].data.instant.details.wind_from_direction,
                              this.vindHastighet = response.properties.timeseries[0].data.instant.details.wind_speed

                              this.state = true;
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
          byggDato  ()  {
              let d = new Date();
              let dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
              let maaneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

              let dag = dager[d.getDay()];
              let dato = d.getDate();
              let maaned = maaneder[d.getMonth()];

              return `${dag} ${dato} ${maaned}`;
        }
    },
    computed: {
      valgtStylingPreset(){
        return { 'vaer-forhold-stor': this.preset === 'stor',
        'vaerForholdMedium': this.preset === 'medium',
        'vaer-forhold-liten': this.preset === 'liten' }
      },


    // Finner frem riktig bilde til forholdskoden
    passendeVaerGrafikk(){
        return vaerForholdTilGrafikkMap[this.forhold];
      },

    // Omdanner vinkelgrader til himmelretninger som NØ, SV, N etc. 
    skaffHimmelretning() {
      // 8 himmelretninger av ant. mulige defineres
      const graderPrRetning = 360 / 8;

      const vinkel = this.vindRetning

      // Trigonometrisk kalkulasjon. Man
      const utjevnetVinkel = vinkel + graderPrRetning / 2;

      // if -sjekker 
      return (utjevnetVinkel >= 0 * graderPrRetning && utjevnetVinkel < 1 * graderPrRetning) ? require('./assets/ikoner/nord.svg')
         : (utjevnetVinkel >= 1 * graderPrRetning && utjevnetVinkel < 2 * graderPrRetning) ? require('./assets/ikoner/nordøst.svg')
          : (utjevnetVinkel >= 2 * graderPrRetning && utjevnetVinkel < 3 * graderPrRetning) ? require('./assets/ikoner/øst.svg')
            : (utjevnetVinkel >= 3 * graderPrRetning && utjevnetVinkel < 4 * graderPrRetning) ? require('./assets/ikoner/sørøst.svg')
              : (utjevnetVinkel >= 4 * graderPrRetning && utjevnetVinkel < 5 * graderPrRetning) ? require('./assets/ikoner/sør.svg')
                : (utjevnetVinkel >= 5 * graderPrRetning && utjevnetVinkel < 6 * graderPrRetning) ? require('./assets/ikoner/sørvest.svg')
                  : (utjevnetVinkel >= 6 * graderPrRetning && utjevnetVinkel < 7 * graderPrRetning) ? require('./assets/ikoner/vest.svg')
                    : require('./assets/ikoner/nordvest.svg');
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
  font-family: "Inter", sans-serif;
	line-height: 1.5;
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

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(7 95 82 / 75%));
}


.beskrivelse {
  margin-top: 25px;
  padding-left: 10px;
  margin: .5em auto;
  color: white;
}

  a {
    color: rgba(227, 227, 227, 0.78);
    text-decoration: none;
    border-bottom: 1px solid currentColor;
}

.søk-boks {
  width: 30%;
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
  text-align:center;
  appearance: none;
  border: none;
  outline: none;
  background: none;
   background: url("./assets/search.svg") left / contain no-repeat;

  background-color: rgba(255, 255, 255, 0.15);
  transition: 0.5s;
  border-radius: 5px;
}

.dato {
  background: #972323;
  color: white;
    margin-top: -3px;
    margin-inline: -3px;
    text-align: center;
}

.vind-retning {
  width: 30px;
  background: #FFC233;
}

img {
  width: 100%;
}

.vaer-forhold-medium img{
	filter: drop-shadow(-4.5px 3.5px 0 var(--weather-double-color));
}

</style>
