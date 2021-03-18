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
	import VaerApi from './adapter.js'
  import Kort from './Kort'

  Kort
  VaerApi.hentSamtidsVaerData(62, 10);

export default {
  name: 'App',
  data () {
    return {
      query: '',
      } 
     },
    methods: {
      skaffVaer (e) {
        if (e.key == "Enter") {
          VaerApi.hentGeoKoordinater(this.query); 
        }
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
