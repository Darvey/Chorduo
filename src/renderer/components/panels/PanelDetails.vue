<template>
	<div class="panel is-details" :class="panelClass">
		<div class="panel-header">
			<div class="panel-title">
				<i class="icon icon-library"></i>
				<span class="text">Details</span>
			</div>
		</div>
		<div class="panel-content">
			<div class="details-resume" v-if="chord.chordFound">
				<transition name="animate" appear mode="out-in">
					<details-chord :chord="chord.chordFound"
					               v-if="settings.detailsPanelMode === 'chord' && chord.chordFound" key="chord">

					</details-chord>
					<details-chord-scales :chord="chord.chordFound"
					                      v-if="settings.detailsPanelMode === 'chord-scales' && chord.chordFound"
					                      key="chord-scales">

					</details-chord-scales>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import DetailsChord from "../details/DetailsChord"
	import DetailsChordScales from "../details/DetailsChordScales"
	import ChordStore from "../../../store/ChordStore"
	import Settings from "../../../store/Settings"

	export default {
		name: "panel-details",
		components: {
			DetailsChord,
			DetailsChordScales
		},
		data() {
			return {
				chord: ChordStore.state,
				settings: Settings.state
			}
		},
		computed: {
			panelClass() {
				return 'is-' + this.settings.detailsPanelMode
			}
		}
	}
</script>

<style lang="scss">

	.details-resume {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.panel.is-details {
		.panel-title {
			.text {
				transition: opacity .2s ease .3s, transform .3s ease .3s;
			}
		}

		&.is-chord-scales {
			.panel-title {
				.text {
					transform: translate(-10px, 0);
					opacity: 0;
					transition-delay: 0s;
				}
			}
		}
	}

</style>