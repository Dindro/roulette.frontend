<template>
	<div class="end">
		<h1 class="end__title">{{ text }}</h1>
		<button class="end__reset" type="button" @click="onClickReset">Играть снова</button>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
	},

	methods: {
		onClickReset() {
			this.$emit('reset');
		},
	},
}
</script>

<style lang="scss">
.end {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(white, 0.85);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	&__title {
		font-size: 60px;
		margin-bottom: 30px;
		text-align: center;
	}

	&__reset {
		padding: 20px;
		border-radius: 5px;
		border: none;
		background: #1689e7;
		color: white;

		&:hover {
			background: #0c4b7e;
		}
	}
}
</style>
