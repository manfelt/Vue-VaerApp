<template>
<div :class='valgtStylingPreset'>
	<img :src='passendeVaerGrafikk' />
</div>
</template>

<script>

let vaerForholdTilGrafikkMap = {
	'clearsky_day': './assets/ikoner/01d.svg',
	'clear_night': './assets/ikoner/01d.svg',
	'cloudy': './assets/ikoner/04.svg',
	'few_clouds': './assets/ikoner/01d.svg',
	'fair_day': './assets/ikoner/01d.svg',
	'partlycloudy_day': './assets/ikoner/01d.svg',
	'partlycloudy_night': './assets/ikoner/01d.svg',
	'rain': './assets/ikoner/09.svg'
}

export default  {
	name: 'vaer-forhold-grafikk',
	data() {'preset', 'vaer-forhold'},
	computed: {
		valgtStylingPreset(){
			return { 'vaer-forhold-stor': this.preset === 'stor',
			'vaerForholdMedium': this.preset === 'medium',
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