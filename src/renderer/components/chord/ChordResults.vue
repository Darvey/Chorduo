<template>
	<div class="chords-results">
		<div class="chords-results-nav is-left" @click="scroll(-160)"></div>
		<div class="chords-results-nav is-right" @click="scroll(160)"></div>
		<div class="chords-results-scroll" @mousewheel="onScroll">
			<transition-group name="fade-scale" tag="div" class="inner" mode="out-in">
				<chord v-if="chords.chordFound" v-for="fingering in fingerings" :fingering="fingering"
				       :key="fingering.key"></chord>
			</transition-group>
		</div>
	</div>
</template>

<script>
	import ChordStore from '../../../store/ChordStore'
	import Chord from './Chord'
	import TweenMax from 'gsap'

	export default {
		name: "chord-results",
		components: {
			Chord
		},
		data() {
			return {
				chords: ChordStore.state
			}
		},
		computed: {
			fingerings() {
				let f = []
				if (this.chords.chordFound) {
					for (let i in this.chords.chordFound.fingerings) {
						f.push(this.chords.chordFound.fingerings[i])
					}
				}
				return f
			}
		},
		mounted() {
			this.$scroll = this.$el.querySelector('.chords-results-scroll')
		},
		methods: {
			/**
			 * scroll d'une certaine distance la div contenant la liste d'accords
			 * @param distance
			 */
			scroll(distance) {
				if (this.$scroll) {
					TweenMax.to(this.$scroll, .3, {
						scrollLeft: this.$scroll.scrollLeft + distance,
						ease: Power3.easeOut
					})
				}
			},

			/**
			 * evenement mousewheel sur la div des accords, si on scroll verticalement, scrolle horizontalement
			 * @param event
			 */
			onScroll(event) {
				console.log(event);
				if (event.deltaY < 20) {
					this.$scroll.scrollLeft += event.deltaY
				} else {
					// utilise la fonction avec une animation si le scroll est trop important
					this.scroll(event.deltaY)
				}
			}
		}
	}
</script>

<style lang="scss">

	.chords-results {
		width: 100%;
		padding: 0 80px;
		position: relative;

		&-nav {
			position: absolute;
			top: 50%;

			&::before {
				content: '';
				display: block;
				width: 15px;
				height: 15px;
				border-left: 1px solid #999;
				border-top: 1px solid #999;
				transform: translate(0, -50%) rotate(-45deg);
			}

			&.is-left {
				left: 30px;
			}

			&.is-right {
				right: 30px;

				&::before {
					transform: translate(0, -50%) rotate(135deg);
				}
			}
		}

		&-scroll {
			height: 200px;
			padding: 40px 0;
			overflow-x: auto;
			width: 100%;

			.inner {
				display: flex;
				height: 100%;
			}
		}
	}

</style>