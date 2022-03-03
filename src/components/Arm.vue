<template>
	<div class="arm" :class="{ 'arm--disabled': disabled || processing, 'arm--processing': processing }" @click="onClick">
		<img class="arm__image arm__level" src="@/assets/arm/level.svg" />
		<img class="arm__image" src="@/assets/arm/footer.svg" />
	</div>
</template>

<script>
export default {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			processing: false,
		};
	},

	methods: {
		onClick() {
			if (this.disabled) {
				return;
			}

			this.processing = true;
			this.enableProcessDisalbed();

			setTimeout(() => {
				this.$emit('click');
			}, 100);
		},

		enableProcessDisalbed() {
			this.$el.addEventListener('transitionend', () => {
				this.processing = false;
			}, { once: true });
		},
	},
}
</script>

<style lang="scss">
.arm {
	$b: #{&};

	position: relative;
	cursor: pointer;
	transform: rotate(-90deg) translateY(2%);

	&--disabled {
		cursor: initial;
	}

	&--processing {
		#{$b}__level {
			transform: rotate(-30deg);
		}
	}

	&__level {
		z-index: -1;
		position: absolute;
		transform-origin: 50% 85%;
		transform: rotate(30deg);
		transition: transform ease-in-out 0.6s;
	}

	&__image {
		max-width: 100%;
		width: 100%;
	}
}
</style>
