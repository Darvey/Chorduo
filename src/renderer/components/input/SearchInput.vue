<template>
	<div class="header-search">
		<input type="text" placeholder="Search" class="header-search-input" v-model="search">
		<div class="header-search-content overlay" :class="{'is-active': isActive}">
			<button class="overlay-close button-icon" @click="close()">
				<i class="icon icon-close"></i>
			</button>

			<div class="results">

				<div class="list">
					<div class="list-title">Chords</div>
					<div class="list-inner">
						<div class="list-item" v-for="chord in filteredChord" @click="selectChord(chord)">
							<div class="list-item-icon">
								<i class="icon icon-volume"></i>
							</div>
							<div class="list-item-content">
								<div class="list-item-name">{{ chord.getFullName() }}</div>
								<div class="list-item-notes">
									<div class="list-item-note" v-for="note in chord.notes">
										{{ settings.realNotesNames[note-1] }}
									</div>
								</div>
							</div>
						</div>
						<div class="list-noresult" v-if="filteredChord.length === 0">
							No results found
						</div>
					</div>
				</div>

				<div class="list">
					<div class="list-title">Scales</div>

					<div class="list-inner">
						<div class="list-item" v-for="scale in filteredScales" @click="selectScale(scale)">
							<div class="list-item-icon">
								<i class="icon icon-volume"></i>
							</div>
							<div class="list-item-content">
								<div class="list-item-name">{{ scale.getFullName() }}</div>
								<div class="list-item-notes">
									<div class="list-item-note" v-for="note in scale.notes">
										{{ settings.realNotesNames[note-1] }}
									</div>
								</div>
							</div>
						</div>
						<div class="list-noresult" v-if="filteredScales.length === 0">
							No results found
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

	import ScaleStore from '../../../store/ScaleStore'
	import ChordStore from '../../../store/ChordStore'
	import Settings from '../../../store/Settings'

	export default {
		name: "search-input",
		data() {
			return {
				search: "",
				settings: Settings.state
			}
		},
		created() {
			this.scales = ScaleStore.scales
			this.chords = ChordStore.chords
		},
		computed: {
			filteredScales() {
				return this.search.length === 0 ? [] : this.scales.filter((scale) => {
					return scale.getFullName().match(this.search);
				})
			},
			filteredChord() {
				return this.search.length === 0 ? [] : this.chords.filter((chord) => {
					return chord.getFullName().match(this.search);
				})
			},
			/**
			 * est ce qu'on doit afficher les resultats de recherche
			 */
			isActive() {
				return this.search.length > 0
			}
		},
		methods: {
			close() {
				this.search = ''
			},
			/**
			 * selectionne un accord au click dessus dans la liste
			 * @param chord
			 */
			selectChord(chord) {
				Settings.selectNotes(chord.notes)
				this.close()
			},
			/**
			 * selectionne une gamme au click dessus dans la liste
			 * @param scale
			 */
			selectScale(scale) {
				Settings.selectNotes(scale.notes, 'scale')
				this.close()
			}
		}
	}
</script>

<style lang="scss">
	.header-search-input {
		background-color: #16181A;
		background-image: url('../../assets/icns/search-icn.svg');
		background-repeat: no-repeat;
		background-position: 10px 7px;
		width: 228px;
		border-radius: 100px;
		border-style: none;
		color: #FFF;
		font-weight: 300;
		font-size: 1.4rem;
		line-height: 26px;
		height: 26px;
		padding-left: 30px;
		padding-top: 1px;
		caret-color: $color-blue;
		outline: none;

		&::-webkit-input-placeholder {
			color: rgba(255, 255, 255, .3);
		}
	}

	.header-search-content {
		.results {
			display: flex;
			justify-content: space-between;
			padding: 30px;
			height: 100%;
			max-width: 650px;
			margin: 0 auto;

			.list {
				width: calc(50% - 30px);
				height: 100%;
				display: flex;
				flex-direction: column;

				&-inner {
					overflow-y: auto;
					flex: 1;
				}
			}
		}
	}
</style>