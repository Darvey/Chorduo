<template>
	<div class="key" :class="{ 'is-light': !isDark, 'is-dark': isDark, 'is-full': isFull , 'is-active': noteStore.selectedNotes[note] }" @click="toggleNote()">
		<div class="key-inner">
			<div class="key-text">{{ settings.realNotesNames[note % 12] }}</div>
		</div>
	</div>
</template>

<script>

	import NoteStore from '../../../store/NoteStore'
	import Settings from '../../../store/Settings'

	export default {
		name: "key",
		props: {
			isDark: {
				type: Boolean,
				default: false
			},
			isFull: {
				type: Boolean,
				default: false
			},
			note: Number
		},
		data() {
			return { 
				noteStore: NoteStore.state,
				settings: Settings.state
			}
		},
		methods: {
			toggleNote(){
				NoteStore.toggleNote(this.note)
			}
		}
	}
</script>

<style lang="scss">

	.key {
		cursor: pointer;
		transition: background-color .3s ease;
	}

	.key.is-light {
		width: (100% / 14);
		position: relative;

		.key-inner {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity: 0;
				background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 33%,rgba(255,255,255,1) 66%,rgba(255,255,255,1) 100%);
				transition: opacity .3s ease;
			}
		}

		&:not(:last-child)::before {
			content: '';
			z-index: 5;
			position: absolute;
			top: 50%;
			bottom: 0;
			right: -1px;
			width: 2px;
			background-color: $color-dark;
		}

		&.is-full::before {
			top: 0;
		}

		&:hover {
			.key-inner::before {
				opacity: 0.6;
			}
		}

		&.is-active {
			.key-inner::before {
				opacity: 1;
			}
		}
	}

	.key.is-dark {
		width: 0;
		position: relative;
		z-index: 10;

		.key-inner {
			position: absolute;
			width: 22px;
			top: 10%;
			height: 60%;
			border-radius: 3px;
			background-color: #2B2D2F;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
			transform: translate(-50%, 0);
			transition: background-color .3s ease;
			border: 1px solid #2B2D2F;
		}

		.key-text {
			color: $color-lighter;
			bottom: 6px;
			font-size: 1rem;
		}

		&:hover {
			.key-inner {
				background-color: #444;
			}
		}

		&.is-active {
			.key-inner {
				background-color: #777;
			}
		}
	}
</style>