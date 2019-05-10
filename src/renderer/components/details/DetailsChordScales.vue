<template>
	<div class="details-chord-scales">
		<div class="head">
			<div class="head-name" v-html="chordName"></div>
			<div class="head-notes">
				<div class="note" v-for="(note, index) in chord.notes">
					<div class="note-name" :class="getNoteClass(chord.intervals[index])">{{ settings.realNotesNames[note-1]
						}}</div>
					<div class="note-number">{{ getIntervalName(chord.intervals[index]) }}</div>
				</div>
			</div>
			<div class="head-buttons">
				<button><i class="icon icon-volume"></i></button>
			</div>
		</div>

		<div class="content">
			<div class="content-top">
				<div class="content-top-title">
					Scales
					<span>( List of scales that match with )</span>
				</div>
				<div class="content-top-button">
					<button @click="clickBack()">
						<i class="icon icon-arrow is-top"></i>
					</button>
				</div>
			</div>

			<div class="content-scroll">
				<div class="content-scroll-inner">
					<div class="list-item" v-for="scale in scalesList" @click="selectScale(scale)">
						<div class="list-item-icon">
							<i class="icon icon-volume"></i>
						</div>
						<div class="list-item-number">
							{{ scale.getNotePosition(chord.root) }}
						</div>
						<div class="list-item-content">
							<div class="list-item-name">
								{{ scale.getRealName() }}
							</div>
							<div class="list-item-notes">
								<div class="list-item-note" v-for="note in scale.notes" :class="notesColors[note]">
									{{ settings.realNotesNames[note-1] }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="content-bottom">
				<button class="button">Add to working palette</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Settings from "../../../store/Settings"
	import ScaleStore from "../../../store/ScaleStore"
	import Mixins from "../../mixins/Mixins"


	export default {
		name: "details-chord-scales",
		mixins: [Mixins.notes],
		props: {
			chord: {}
		},
		data() {
			return {
				settings: Settings.state
			}
		},
		computed: {
			chordName() {
				return this.chord.getRealName()
			},
			scalesList() {
				return ScaleStore.getScalesWithChords([this.chord])
			},
			notesColors() {
				let notesColors = []
				for(let i = 1; i <= 12; i++) {
					notesColors[i] = ''
				}
				for(let i = 0; i < this.chord.notes.length; i++) {
					notesColors[this.chord.notes[i]] = this.getNoteClass(this.chord.intervals[i])
				}
				return notesColors
			}
		},
		methods: {
			/**
			 * click retour, retour au mode chord
			 */
			clickBack() {
				this.settings.detailsPanelMode = 'chord'
			},
			selectScale(scale) {
				Settings.selectNotes(scale.notes, 'scale')
			}
		}
	}

</script>

<style lang="scss">

	.details-chord-scales {
		height: 100%;

		.head {
			position: absolute;
			top: -45px;
			left: 0;
			right: 0;
			height: 45px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 50px;

			&-name {
				color: #B8B8B8;
				font-size: 2rem;
			}

			&-notes {
				display: flex;

				.note {
					display: flex;
					align-items: center;

					&-name {
						font-size: 1.6rem;
					}

					&-number {
						font-size: 1.1rem;
						color: rgba(255,255,255,.4);
						padding-left: 3px;
						padding-right: 8px;
					}
				}
			}

			&-buttons {
				padding-right: 10px;

				button {
					display: inline-block;
					padding: 5px;
					color: rgba(255,255,255,.4);
					font-size: 16px;
					transition: color .3s ease;

					&:hover {
						color: rgba(255,255,255,.8);
					}
				}
			}
		}

		.content {
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 20px;

			&-top {
				display: flex;
				justify-content: space-between;

				&-title {
					color: #E2E3E3;
					font-size: 1.4rem;
					font-weight: 300;

					span {
						font-size: 1.2rem;
						color: #494D53;
					}
				}
			}

			&-scroll {
				flex: 1;
				position: relative;

				&-inner {
					position: absolute;
					top: 20px;
					bottom: 20px;
					left: 0;
					right: 0;
					overflow-y: auto;
				}
			}

			&-bottom {
				text-align: center;
			}
		}

		// animation d'entree
		&.animate-enter {
			.head-name, .head-notes .note {
				opacity: 0;
				transform: translate(-20px, 0);
			}
			.content-top, .content-scroll {
				opacity: 0;
				transform: translate(0, 20px);
			}
			.content-bottom {
				opacity: 0;
				transform: scale(.8);
			}
		}

		&.animate-enter-active {
			transition: transform 1s ease;

			.head-name, .head-notes .note {
				transition: opacity .2s ease, transform .3s $ease-out-circ;
			}

			@for $i from 1 to 12 {
				.head-notes .note:nth-child(#{$i}) {
					transition-delay: $i * .03s + .1s;
				}
			}

			.content-top, .content-scroll, .content-bottom {
				transition: opacity .2s ease, transform .3s $ease-out-circ;
			}
			.content-top {
				transition-delay: .2s;
			}
			.content-scroll {
				transition-delay: .3s;
			}
			.content-bottom {
				transition-delay: .5s;
			}
		}

		// animation de sortie
		&.animate-leave-to {
			opacity: 0;
		}

		&.animate-leave-active {
			transition: opacity .3s ease;
		}
	}

</style>