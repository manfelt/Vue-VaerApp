<template>
	<div class='kort'>
		<slot>
		</slot>
	</div>
</template>
<script>
export default {
	name: 'kort-view'
}
</script>
<style>
.kort {
	box-sizing: border-box;
    width: 100%;
	height: 100%;
	border-radius: 20px;
	border: 2.9px solid #92c3f5;
}
</style>