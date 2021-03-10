<template>
  <div id="app">
    <main>
      <div class="søk-boks">
        <input type="text" name="" id="" class="søk-bar" placeholder="Søk..."/>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {

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
