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
          <div class="sted">Blokksberg</div>
            <div class="dato">Fredag 13. August</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  
	import VaerApi from './adapter'
  import Kort from './Kort'

 Kort

export default {
  name: 'App',
  data () {
    return {
      query: '',
      koordinater: [],
      weather: {}
      }
     },
    methods: {
      skaffVaer (e) {
        if (e.key == "Enter") {
          fetch(`https://nominatim.openstreetmap.org/search?q=${this.query}&format=geojson`, {mode: 'cors'})
          .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log("hentGeokoordinater OK")
            let koordinater = [];
            let lengdegrad = response.features[0].geometry.coordinates[0].toFixed(2);
            let breddegrad = response.features[0].geometry.coordinates[1].toFixed(2);
            koordinater.push({
                0: lengdegrad,
                1: breddegrad
            });
           /*  console.log(koordinater[0][0], koordinater[0][1]); */
            return koordinater;
        })
        .then(this.setResults);
        }
      },
        setResults (results) {
          this.weather = VaerApi.hentSamtidsVaerData(results)
          return results;
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
