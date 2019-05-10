import Vue from 'vue'
import ScaleStore from './ScaleStore.js'
import ChordStore from './ChordStore.js';
import Setting from './Settings.js';

/*
 * Class Global
 */
class NoteStore {

	constructor() {

		this.state = {
			// tableau de booleen représentant les notes actives
			selectedNotes: Array(24).fill(false)
		}
	}

	notesUpdated() {
		if ( Setting.state.searchMode == "chord"){
			ChordStore.setChordFound()
		}else{
			ScaleStore.setScalesFound()
		}
	}

	toggleNote(pNote) {
		Vue.set(this.state.selectedNotes, pNote, !this.state.selectedNotes[pNote])
		this.notesUpdated()
	}

	resetSelectedNotes() {
		this.state.selectedNotes = Array(24).fill(false)
		this.notesUpdated()
	}

	setNotes(notes) {
		this.state.selectedNotes = Array(24).fill(false)
		for(let n of notes) {
			this.state.selectedNotes[n - 1] = true
		}
		this.notesUpdated()
	}
}

export default new NoteStore()