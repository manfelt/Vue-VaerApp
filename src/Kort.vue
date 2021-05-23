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
    width: 30%;
	height: 100%;
	border-radius: 0px;
	border: 2.7px solid #1167be00;
	background: rgba(239 251 255);
	box-sizing: border-box;
}
</style>
