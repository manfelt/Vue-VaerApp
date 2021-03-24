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

  import { reactive } from "vue";
 Kort

export default {
  name: 'App',
  components: {
    VaerApi,
    Geografi,
  },

    setup() {
    const state = reactive({
      InputValue: "",
      results: [
        { id: "" },
        { sted: "" },
        { temperatur: "" },
        { weather_state_img: "" },
      ],
      
      state: false,
    });
    

       const skaffVaer = (e) => {
        if (e.key == "Enter") {
           const koordinater = Geografi.hentGeoKoordinater(this.query);
           const sted = this.query;
            setResults(koordinater);
            console.log(sted);
        }
      };
         const setResults = (koordinater) => {
          this.Vaer = VaerApi.hentSamtidsVaerData(koordinater);
          state.state = true;
        }
          const byggDato = () => {
          let d = new Date();
          let dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
          let maaneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

          let dag = dager[d.getDay()];
          let dato = d.getDate();
          let maaned = maaneder[d.getMonth()];

          return `${dag} ${dato} ${maaned}`;
        }
      return {
        skaffVaer,
        byggDato,
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
