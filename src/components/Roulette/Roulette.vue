<template>
	<div class="roulette">
		<div class="roulette__while">
			<While
				ref="while"
				class="roulette__view"
				v-bind="$attrs"
				v-on="$listeners"
			/>
		</div>
	</div>
</template>

<script>
import While from './While.vue';

export default {
	inheritAttrs: false,

	components: {
		While,
	},

	methods: {
		rotate() {
			this.$refs.while.startRotate();
		},
	},
}
</script>

<style lang="scss">
.roulette {
	&__while {
		padding-top: 100%;
		position: relative;
	}

	&__view {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
