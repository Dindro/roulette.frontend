<template>
	<button class="reset" type="button" v-on="$listeners" v-bind="$attrs">
		Сбросить
	</button>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.reset {
	background: transparent;
	color: #e8e8e8;
	border: 1px solid currentColor;
}
</style>
