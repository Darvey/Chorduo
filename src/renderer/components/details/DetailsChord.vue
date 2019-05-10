<template>
	<div class="details-chord">
		<div class="name" v-html="chordName"></div>

		<div class="notes">
			<div class="notes-item" v-for="(note, index) in chord.notes">
				<div class="notes-item-head" :class="getNoteClass(chord.intervals[index])">{{ settings.realNotesNames[note-1]
					}}</div>
				<div class="notes-item-content">{{ getIntervalName(chord.intervals[index]) }}</div>
			</div>
		</div>

		<div class="diagram">
			<div class="diagram-item" :class="{'is-active': note.active }" v-for="note in notesForDiagram">
				<div class="diagram-item-note">{{ settings.realNotesNames[note.note] }}</div>
				<div class="diagram-item-background icon-circle-part" :class="note.color"></div>
			</div>
		</div>

		<div class="buttons">
			<button class="button">Add to working palette</button>
		</div>

		<div class="more">
			<button class="more-link" @click="clickSeeMore()">
				See more
			</button>
		</div>
	</div>
</template>

<script>
	import Settings from "../../../store/Settings"
	import Mixins from "../../mixins/Mixins"

	export default {
		name: "details-chord",
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
			/**
			 * retourne les 12 notes a afficher dans le diagram avec les bonnes infos
			 */
			notesForDiagram() {
				if(!this.chord) {
					return [];
				}

				let notes = [];
				for(let i = this.chord.notes[0]; i < this.chord.notes[0] + 12; i++) {
					let note = (i - 1) % 12 + 1,
							active = false,
							color = '';
					if(this.chord.notes.includes(note)) {
						active = true;
						color = 'is-color-'+Settings.state.dotsColor[ this.chord.intervals[ this.chord.notes.indexOf(note) ] ];
					}
					notes.push({
						note: note - 1,
						active: active,
						color: color
					})
				}
				return notes;
			}
		},
		methods: {
			/**
			 * click en savoir plus, bascule sur le mode chord-scales
			 */
			clickSeeMore() {
				this.settings.detailsPanelMode = 'chord-scales'
			}
		}
	}

</script>

<style lang="scss">

	.details-chord {
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-bottom: 60px;

		.name {
			text-align: center;
			color: #B8B8B8;
			font-size: 8rem;
			height: 80px;
		}

		.notes {
			margin: 30px auto 0 auto;
			font-size: 1.6rem;
			width: 95px;
			display: flex;
			justify-content: center;
			text-align: center;

			&-item {
				margin: 0 5px;

				&-content {
					font-size: 1.2rem;
					color: #50535A;
					margin-top: 14px;
				}
			}
		}

		.diagram {
			width: 160px;
			height: 160px;
			background-color: rgba(255,255,255,.05);
			border-radius: 50%;
			position: relative;
			margin: 30px auto;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: #262930;
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}

			&-item {
				position: absolute;
				left: 50%;
				bottom: 50%;
				height: 80px;
				transform-origin: left bottom;
				border-left: 1px solid #262930;
				transition: z-index 0s linear .2s;
				z-index: 1;

				&-note {
					width: 30px;
					text-align: center;
					color: #50535A;
					font-size: 1.5rem;
					line-height: 47px;
					position: relative;
					z-index: 10;
					transition: color .2s ease;
				}

				&-background {
					position: absolute;
					top: -1px;
					left: -8px;
					font-size: 50px;
					z-index: 5;
					transform: rotate(15deg);
					opacity: 0;
					transition: opacity .2s ease;
				}

				// rotation de chaque element du cercle
				@for $i from 1 to 13 {
					$rotate: ($i - 1) * (360 / 12) - (360 / 24);
					@if $rotate < 0 {
						$rotate: $rotate + 360;
					}

					&:nth-child(#{$i}) {
						transform: rotate(#{$rotate}deg);

						.diagram-item-note {
							transform: rotate(-#{$rotate}deg);
						}
					}
				}

				&.is-active {
					z-index: 10;
					transition: none;

					.diagram-item-background {
						opacity: 1;
					}
					
					.diagram-item-note {
						color: #000;
					}
				}
			}
		}

		.buttons {
			text-align: center;
		}

		.more {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;

			&-link {
				display: block;
				width: 100%;
				text-align: center;
				padding-bottom: 40px;
				color: rgba(255, 255, 255, .3);
				transition: color .3s ease;
				font-size: 1.2rem;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 24px;
					border-left: 1px solid currentColor;
					border-bottom: 1px solid currentColor;
					transform: translate(-50%, 0) rotate(-45deg);
					width: 15px;
					height: 15px;
				}
				
				&:hover {
					color: rgba(255,255,255,.9);
				}
			}
		}

		// animation d'entrée
		&.animate-enter {
			.diagram {
				opacity: 0;
				transform: scale(.7);
			}

			.name, .notes {
				opacity: 0;
				transform: translate3d(0, 20px, 0);
			}

			.buttons, .more {
				opacity: 0;
				transform: translate3d(0, -20px, 0);
			}
		}

		&.animate-enter-active {
			transition: transform 1s ease;

			.diagram {
				transition: opacity .2s ease .1s, transform .4s $ease-out-quad .1s;
			}

			.name, .notes, .buttons, .more {
				transition: opacity .5s ease, transform .5s $ease-out-circ;
			}
			.name {
				transition-delay: .4s;
			}
			.notes {
				transition-delay: .3s;
			}
			.buttons {
				transition-delay: .5s;
			}
			.more {
				transition-delay: .6s;
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