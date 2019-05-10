<template>
	<div class="panel is-edition">
		<div class="panel-header">
			<div class="panel-title">
				<i class="icon icon-edit"></i>
				<span>Edition</span>
			</div>
			<div class="switch" :class="{ 'is-right': settings.searchMode === 'scale', 'is-left': settings.searchMode ===
			'chord'	 }">
				<div class="switch-option is-first" @click="toggleMode('chord')">
					Chord
				</div>
				<div class="switch-switcher" @click="toggleMode()">

				</div>
				<div class="switch-option is-second" @click="toggleMode('scale')">
					Scale
				</div>
			</div>
			<div>

			</div>
		</div>
		<div class="panel-content">
			<chord-results v-if="settings.searchMode == 'chord'"></chord-results>
			<guitar v-if="settings.searchMode == 'scale'"></guitar>
			<keyboard></keyboard>
		</div>
	</div>
</template>

<script>
	import Keyboard from "../keyboard/Keyboard";
	import Guitar from "../guitar/Guitar";
	import ChordResults from "../chord/ChordResults";
	import Settings from "../../../store/Settings";

	export default {
		name: "panel-edition",
		components: {
			Keyboard,
			Guitar,
			ChordResults
		},
		data: () => {
			return {
				settings: Settings.state
			}
		},
		methods: {
			toggleMode(toSelect) {
				if(toSelect) {
					Settings.setSearchMode(toSelect);
				} else {
					Settings.setSearchMode((this.settings.searchMode === 'scale') ? 'chord' : 'scale');
				}
			}
		}
	}
</script>

<style lang="scss">

	.panel.is-edition {
		.panel-content {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			padding: 30px 0;
		}

		.panel-header {
			.switch {
				display: flex;
				align-items: center;

				&-option {
					color: #50535A;
					font-size: 1.5rem;
					font-weight: 300;
					transition: color .3s ease;
				}

				&-switcher {
					position: relative;
					height: 18px;
					width: 39px;
					border-radius: 100px;
					background-color: #191A1C;
					box-shadow: inset 0 1px 3px 1px rgba(0, 0, 0, 0.5);
					margin: 0 15px;

					&::before {
						content: '';
						position: absolute;
						top: 3px;
						left: 3px;
						height: 12px;
						width: 12px;
						background-color: #9B9B9B;
						box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
						border-radius: 50%;
						transition: transform .3s ease;
					}
				}

				&.is-left {
					.switch-option {
						&.is-first {
							color: $color-blue;
						}
					}
				}

				&.is-right {
					.switch-option {
						&.is-second {
							color: $color-blue;
						}
					}

					.switch-switcher {
						&::before {
							transform: translate(21px, 0);
						}
					}
				}
			}
		}
	}

</style>