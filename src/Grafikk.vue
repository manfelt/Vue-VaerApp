<template>
<div :class='valgtStylingPreset'>
	<img :src='passendeKondisjonsGrafikk' />
</div>
</template>

<script>

let vaerForholdTilGrafikkMap = {
	'clear': require('Grafikk/art_clear.png'),
	'clear_night': require('Grafikk/art_clear_night.png'),
	'clouds': require('Grafikk/art_clouds.png'),
	'few_clouds': require('Grafikk/art_few_clouds.png'),
	'fair_day': require('Grafikk/art_few_clouds.png'),
	'partlycloudy_night': require('Grafikk/02n.svg'),
	'rain': require('Grafikk/art_rain.png')
}

export default  {
	name: 'vaer-forhold-grafikk',
	props: ['preset', 'forhold'],
	computed: {
		valgtStylingPreset(){
			return { 'vaer-forhold-stor': this.preset === 'stor',
			'vaer-forhold-medium': this.preset === 'medium',
			'vaer-forhold-liten': this.preset === 'liten' }
		},
		passendeVaerGrafikk(){
			return vaerForholdTilGrafikkMap[this.forhold];
		}
	}
}
</script>

<style scoped>
img {
	width: 100%;
}

.vaer-forhold-stor img{
	filter: drop-shadow(-4.5px 3.5px 0 var(--weather-double-color));
}

.vaer-forhold-medium img{
	filter: drop-shadow(-4.5px 3.5px 0 var(--weather-double-color));
}

.vaer-forhold-liten img{
	filter: drop-shadow(-4.5px 3.5px 0 var(--weather-double-color));
}
</style>