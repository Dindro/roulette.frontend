<template>
	<canvas/>
</template>

<script>
import { easeOut } from '@/utils/animation';
import { random } from '@/utils/random';

export default {
	props: {
		options: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			startAngle: 110,
			arc: Math.PI / (this.options.length / 2),
			spinArcStart: 220,
			spinTime: 0,
			spinTimeTotal: 0,
		};
	},

	computed: {
		canvas() {
			return this.$el;
		},

		optionsColors() {
			const baseColors = ['#4E63AD', '#9475b0', '#f26722', '#2e9874', '#e35f46'];
			return this.options.map((option, index) => {
				return baseColors[(index + baseColors.length) % baseColors.length];
			});
		},
	},

	watch: {
		options: {
			handler: 'onChangeOptions',
			deep: true,
		},
	},

	mounted() {
		window.addEventListener('resize', this.onResize, false);
		this.setSize();
		this.draw();
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.onResize, false);
	},

	methods: {
		onChangeOptions() {
			this.arc = Math.PI / (this.options.length / 2),
			this.draw();
		},

		getSize() {
			const width = this.canvas.offsetWidth;
			const height = this.canvas.offsetHeight;
			return {
				width,
				height,
			};
		},

		setSize() {
			const { width, height } = this.getSize();
			this.canvas.setAttribute('height', height);
			this.canvas.setAttribute('width', width);
		},

		onResize() {
			this.setSize();
			this.draw();
		},

		startRotate() {
			this.spinAngleStart = random(25, 50);
  			this.spinTime = 0;
  			this.spinTimeTotal = random(8000, 13000);
			this.$emit('rotate-start');
			requestAnimationFrame(this.rotateStep);
		},

		rotateStep() {
			this.spinTime += 1000 / 60;
			if (this.spinTime >= this.spinTimeTotal) {
				this.stopRotate();
				return;
			}
			const spinAngle = this.spinAngleStart - easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
			this.startAngle += (spinAngle * Math.PI / 180);
			this.draw();
			requestAnimationFrame(this.rotateStep);
		},

		stopRotate() {
			const degrees = this.startAngle * 180 / Math.PI + 90;
			const arcd = this.arc * 180 / Math.PI;
			const index = Math.floor((360 - degrees % 360) / arcd);
			const value = this.options[index];
			this.$emit('select', value);
			this.$emit('rotate-stop');

			this.ctx.save();
			this.ctx.restore();
		},

		draw() {
			if (!this.canvas.getContext) {
				return;
			}

			const { width, height } = this.getSize();
			const outsideRadius = width / 2 / 1.1;
			const textRadius = width / 2 / 1.1 / 1.37;
			const insideRadius = 0;
			const ctx = this.canvas.getContext("2d");
			this.ctx = ctx;
			ctx.clearRect(0, 0, width, height);

			ctx.strokeStyle = "Teal";
			ctx.lineWidth = 0;

			ctx.font = `bold ${width / 2 / 6}px Rubik, sans-serif`;

			for (let i = 0; i < this.options.length; i++) {
				const angle = this.startAngle + i * this.arc;
				//ctx.fillStyle = colors[i] ** getColor(i,this.options.length) ;
				ctx.fillStyle = this.optionsColors[i];

				ctx.beginPath();
				ctx.arc(width / 2, width / 2, outsideRadius, angle, angle + this.arc, false);
				ctx.arc(width / 2, width / 2, insideRadius, angle + this.arc, angle, true);
				ctx.fill();
				ctx.save();
				const imageObj = new Image();
				ctx.fillStyle = "white";
				ctx.translate(width / 2 + Math.cos(angle + this.arc / 2) * textRadius, width / 2 + Math.sin(angle + this.arc / 2) * textRadius);
				ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
				const text = this.options[i];
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
				ctx.drawImage(imageObj, 0, 0, width / 2, height / 2);
				ctx.restore();
			}

			// Arrow
			ctx.beginPath();
			ctx.moveTo(width / 2 - width * 0.03, 5);
			ctx.lineTo(width / 2 + width * 0.03, 5);
			// ctx.lineTo(width / 2 + width * 0.03, width * 0.1);
			ctx.lineTo(width / 2 + 0, width * 0.12);
			// ctx.lineTo(width / 2 - width * 0.03, width * 0.1);
			ctx.lineTo(width / 2 - width * 0.03, 5);
			ctx.lineTo(width / 2 + width * 0.03, 5);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 3;
			ctx.shadowColor = "rgba(0,0,0,0.2)";
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.stroke();
			ctx.end;
		},
	},
}
</script>
