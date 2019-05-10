<template>
	<div class="guitar">
		<div class="guitar-rows">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="guitar-cols">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="guitar-marks">
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
			<div class="guitar-mark">
				<div></div>
			</div>
		</div>
		<div class="guitar-numbers">
			<div class="guitar-number">
				<div>3</div>
			</div>
			<div class="guitar-number">
				<div>5</div>
			</div>
			<div class="guitar-number">
				<div>7</div>
			</div>
			<div class="guitar-number">
				<div>9</div>
			</div>
			<div class="guitar-number">
				<div>12</div>
			</div>
			<div class="guitar-number">
				<div>15</div>
			</div>
		</div>
		<div class="guitar-notes">
			<div class="guitar-note" v-for="noteEmpty in settings.guitarTuning">
				<div class="guitar-note-empty" :class="{ 'is-active': noteStore.selectedNotes[noteEmpty] }"
				     @click="toggleNote(noteEmpty)">
					{{ settings.realNotesNames[noteEmpty] }}
					<span>{{ settings.realNotesNames[noteEmpty] }}</span>
				</div>
				<div class="guitar-note-item" v-for="note in notesFrom(noteEmpty)" :class="{ 'is-active':
				noteStore.selectedNotes[note]
				 }" @click="toggleNote(note)">
					<span>{{ settings.realNotesNames[note] }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Settings from '../../../store/Settings'
	import NoteStore from '../../../store/NoteStore'

	export default {
		name: "guitar",
		data() {
			return {
				settings: Settings.state,
				noteStore: NoteStore.state
			}
		},
		methods: {
			// Retourne les notes à afficher sur la corde, par rapport a la note de la corde a vide
			notesFrom(note) {
				let notes = []
				for (let i = 0; i < 17; i++) {
					note++
					if (note > 11) {
						note = 0
					}
					notes.push(note)
				}
				return notes
			},

			toggleNote(note) {
				NoteStore.toggleNote(note)
			}
		}
	}
</script>

<style lang="scss">
	$guitarRows: 5;
	$guitarCols: 17;

	.guitar {
		position: relative;
		width: 540px;
		height: 111px;

		&-cols, &-rows {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			pointer-events: none;

			> div {
				background-color: $color-grey-light;
			}
		}

		&-rows {
			flex-direction: column;

			> div {
				height: 1px;
				width: 100%;
				background-color: $color-grey;
			}
		}

		&-cols {
			flex-direction: row;

			> div {
				width: 1px;
				height: 100%;
			}

			&::before {
				content: '';
				position: absolute;
				left: -3px;
				top: -3px;
				bottom: -3px;
				width: 6px;
				background-color: $color-grey;
				border-radius: 3px;
			}
		}

		&-notes {
			position: absolute;
			top: -10%;
			bottom: -10%;
			left: -35px;
			right: 0;
			display: flex;
			flex-direction: column;
		}

		&-note-item, &-note-empty {
			> span {
				display: block;
				width: 18px;
				height: 18px;
				line-height: 20px;
				font-size: 10px;
				background-color: #fff;
				border-radius: 50%;
				text-align: center;
				color: $color-dark;
				opacity: 0;
				box-shadow: 0 0 3px rgba(0, 0, 0, .2);
				transform: scale(.2);
				transition: opacity .2s ease, transform .3s ease;
			}

			&.is-active {
				span {
					opacity: 1;
					transform: none;
				}
			}
		}

		&-note {
			color: $color-grey-light;
			font-size: 1rem;
			flex: 1;
			display: flex;
			align-items: center;

			&-item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&-empty {
				width: 35px;
				position: relative;
				text-align: center;

				> span {
					position: absolute;
					top: 50%;
					left: 50%;
					margin-top: -9px;
					margin-left: -9px;
				}
			}
		}

		&-marks {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			pointer-events: none;
		}

		&-mark {
			position: absolute;
			top: (100% / $guitarRows) * 2;
			width: (100% / $guitarCols);
			height: (100% / $guitarRows);

			> div {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 8px;
				height: 8px;
				background-color: #464646;
				border-radius: 50%;
			}

			&:nth-child(1) {
				left: (100% / $guitarCols) * 2;
			}
			&:nth-child(2) {
				left: (100% / $guitarCols) * 4;
			}
			&:nth-child(3) {
				left: (100% / $guitarCols) * 6;
			}
			&:nth-child(4) {
				left: (100% / $guitarCols) * 8;
			}
			&:nth-child(5) {
				left: (100% / $guitarCols) * 11;
				top: (100% / $guitarRows) * 1;
			}
			&:nth-child(6) {
				left: (100% / $guitarCols) * 11;
				top: (100% / $guitarRows) * 3;
			}
			&:nth-child(7) {
				left: (100% / $guitarCols) * 14;
			}
		}

		&-numbers {
			position: absolute;
			bottom: -20px;
			left: 0;
			right: 0;
			pointer-events: none;
		}

		&-number {
			position: absolute;
			width: (100% / $guitarCols);
			text-align: center;
			color: #858687;
			font-size: 1.2rem;
			font-weight: 300;

			&:nth-child(1) {
				left: (100% / $guitarCols) * 2;
			}
			&:nth-child(2) {
				left: (100% / $guitarCols) * 4;
			}
			&:nth-child(3) {
				left: (100% / $guitarCols) * 6;
			}
			&:nth-child(4) {
				left: (100% / $guitarCols) * 8;
			}
			&:nth-child(5) {
				left: (100% / $guitarCols) * 11;
			}
			&:nth-child(6) {
				left: (100% / $guitarCols) * 14;
			}
		}
	}
</style>