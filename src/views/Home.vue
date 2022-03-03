<template>
	<div class="home-page">
		<div class="main">
			<div class="main__roulette">
				<Roulette
					ref="roulette"
					class="main__roulette-source"
					:options="rouletteOptions"
					@rotate-start="onStartRotate"
					@rotate-stop="onStopRotate"
					@select="onSelectRotate"
				/>
			</div>
			<div class="main__arm">
				<Arm @click="onClickArm" :disabled="rotating"/>
			</div>
		</div>
		<div class="footer">
			<ResetAction @click="onClickReset" :disabled="rotating" />
		</div>

		<Informer v-if="informerShown" :value="selectedRouletteOption" :link="options[selectedRouletteOption]" @close="onCloseInformer" />
		<End v-if="endShown" @reset="onResetEnd" text="Спасибо за игру!" />
	</div>
</template>

<script>
import ResetAction from '@/components/Reset.vue';
import Arm from '@/components/Arm.vue';
import Roulette from '@/components/Roulette/Roulette.vue';
import Informer from '@/components/Informer.vue';
import End from '@/components/End.vue';

import OptionsService from '@/services/options-service';

import { mixArray } from '@/utils/random';

export default {
	name: 'Home',

	components: {
		ResetAction,
		Arm,
		Roulette,
		Informer,
		End,
	},

	data() {
		return {
			rotating: false,
			options: {},
			rouletteOptions: [],
			endShown: false,
			informerShown: false,
			selectedRouletteOption: null,
		};
	},

	created() {
		this.setOptions(OptionsService.getOptions());
		window.setOptions = this.setOptions;
	},

	methods: {
		setOptions(options) {
			try {
				if (Object.keys(options).length === 0) {
					console.error('Объект пустой!');
					return;
				}
			} catch (error) {
				console.error('Кажется это не объект. Нужно в формате { 1: "https://vk.com", 2: "https://facebook.com" }');
				return;
			}

			this.options = options;
			this.setRouletteOptions(options);
		},

		setRouletteOptions(options) {
			const optionsKeys = Object.keys(options);
			const randomOptionsKeys = mixArray(optionsKeys);
			this.rouletteOptions = randomOptionsKeys;
		},

		onResetEnd() {
			this.endShown = false;
			this.setRouletteOptions(this.options);
		},

		onCloseInformer() {
			this.informerShown = false;
			this.selectedRouletteOption = null;
		},

		onClickReset() {
			this.setRouletteOptions(this.options);
		},

		onClickArm() {
			this.$refs.roulette.rotate();
		},

		onStartRotate() {
			this.rotating = true;
		},

		onStopRotate() {
			this.rotating = false;
		},

		onSelectRotate(value) {
			this.selectedRouletteOption = value;
			this.informerShown = true;

			if (this.rouletteOptions.length === 1) {
				const unwatchInformerShown = this.$watch('informerShown', () => {
					if (!this.informerShown) {
						unwatchInformerShown();
						this.endShown = true;
					}
				});
			} else {
				setTimeout(() => {
					this.execludeRouletteOption(value);
				}, 500);
			}
		},

		execludeRouletteOption(value) {
			this.rouletteOptions = this.rouletteOptions.filter(option => option !== value);
		},
	},
};
</script>

<style lang="scss">
.home-page {
	height: 100%;
	position: relative;
}

.main {
	display: flex;
	align-items: center;
	height: 100%;
	overflow: hidden;

	&__roulette {
		width: 70%;
		flex-shrink: 0;
	}

	&__roulette-source {
		padding: 20px;
		max-width: 100vh;
		margin: 0 auto;
	}

	&__arm {
		width: 30%;
		flex-shrink: 0;
	}
}

.footer {
	position: absolute;
	bottom: 16px;
	right: 16px;
}
</style>
