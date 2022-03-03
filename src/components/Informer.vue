<template>
	<div class="informer-layer">
		<div class="informer">
			<a class="informer__link" :href="link" target="_blank" @click="onClickLink">
				<h1 class="informer__value">{{ value }}</h1>
				<p class="informer__text">Открыть</p>
			</a>

			<button v-if="closeShown" class="informer__close" type="button" @click="onClickClose">Закрыть</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: [String, Number],
			required: true,
			default: 3
		},
		link: {
			type: String,
			required: true,
			default: 'https://vk.com'
		},
	},

	data() {
		return {
			closeShown: false,
		};
	},

	methods: {
		onClickLink() {
			this.closeShown = true;
		},

		onClickClose() {
			this.closeShown = false;
			this.$emit('close');
		},
	},
}
</script>

<style lang="scss">
.informer-layer {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(white, 0.5);
	padding: 30px;
}

.informer {
	border-radius: 30px;
	background: white;
	width: 100%;
	max-width: 600px;
	height: 300px;
	box-shadow: 0 5px 10px rgba(black, 0.2);
	padding: 30px;
	text-align: center;
	display: flex;
	flex-direction: column;

	&__link {
		color: black;

		&:hover {
			color: #1689e7;
		}
	}

	&__value {
		font-size: 100px;
	}

	&__close {
		margin-top: auto;
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
