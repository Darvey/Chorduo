<template>
	<div class="chord">
		<div class="chord-numbers">
			<div class="chord-number" v-for="number in numbers">
				<span>{{ number }}</span>
			</div>
		</div>
		<div class="chord-grid">
			<div class="chord-top" v-if="fingering.higherFret === 1"></div>
			<div class="chord-grid-cols">
				<div v-for="dot in fingering.dots">
					<div class="chord-dot" :class="dotClass(dot)"></div>
				</div>
			</div>
			<div class="chord-grid-rows">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: "chord",
		props: {
			fingering: Object
		},
		methods: {
			dotClass(dot) {
				return 'is-fret-' + dot.fretInDiragram + ' is-background-' + dot.color;
			}
		},
		computed: {
			numbers() {
				let n = [], i = 0;
				while(i < 4) {
					n.push(this.fingering.higherFret + i)
					i++
				}
				return n;
			}
		}
	}

</script>

<style lang="scss">

	.chord {
		width: 120px;
		height: 100%;
		margin-right: 40px;
		display: flex;
		flex-shrink: 0;
		justify-content: space-between;

		&-top {
			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			height: 5px;
			border-radius: 2px;
			background-color: #5E5E5E;
		}

		&-numbers {
			width: 10%;
			display: flex;
			flex-direction: column;
		}
		
		&-number {
			flex: 1;
			width: 100%;
			color: #858687;
			text-align: right;
			font-size: 1.2rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		&-grid {
			position: relative;
			width: 80%;

			&-cols, &-rows {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				justify-content: space-between;
			}

			&-cols {
				> div {
					width: 1px;
					height: 100%;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						height: 105%;
						background-color: #5E5E5E;
					}
				}
			}

			&-rows {
				flex-direction: column;

				> div {
					height: 1px;
					width: 100%;
					background-color: #5E5E5E;
				}
			}
		}
	}

	.chord-dot:not(.is-fret-0) {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
		width: 12px;
		height: 12px;
		border-radius: 6px;
		background-color: #fff;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.11);
		z-index: 10;

		&.is-fret-1 {
			top: 12.5%;
		}
		&.is-fret-2 {
			top: 37.5%;
		}
		&.is-fret-3 {
			top: 62.5%;
		}
		&.is-fret-4 {
			top: 87.5%;
		}
	}

	.chord-dot.is-fret-0 {
		position: absolute;
		top: -14px;
		left: -7px;
		width: 14px;

		&::before, &::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 2px;
			background-color: #999;
			border-radius: 1px;
		}

		&::before {
			transform: rotate(45deg);
		}
		&::after {
			transform: rotate(-45deg);
		}

	}

</style>