
import notesData from '../data/notes.json'
import NoteStore from './NoteStore'
 

/*
 * Class Global
 */
class Setting {

	constructor() {

		this.state = {
			lang: 'en',
			// Tableau contenant la note de départ ( notes à vide ) de chaque cordes de guitare.
			// Les valeurs dépendront de l'accordage utilisé
			guitarTuning: [4, 9, 2, 7, 11, 4],
			// Tableau contenant les altérations utilisées par défaut.
			notesAlterations: [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
			// tableau contenant les couleurs des Dots correspondant aux différents intervals
			dotsColor: ["blue", "indigo", "deeppurple", "purple", "pink", "red", "deeporange", "orange", "yellow", "green", "teal", "cyan"],
			// tableau contenant le nom réel des notes en fonction du style d'altération défini
			realNotesNames: ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],

			searchMode: 'chord',
			detailsPanelMode: 'chord'
        }
        
	}

	/**
	 * [setLang]
	 *
	 * change la langue utilisée pour l'affichage du nom des notes
	 * quand celle si est changée, le tableau contenant le nom réel des noms de notes est mis à jour
	 *
	 * @param {<string>}     pLang langage souhaité pour l'affichage du nom des notes
	 */
	setLang(pLang) {
		this.state.lang = pLang
		for (let i = 0; i < 12; i++) {
			this.state.realNotesNames[i] = notesData[i + 1][this.state.lang][this.state.notesAlterations[i]]
		}
	}

	/**
	 * mise a jour du mode de rechercher (chord, scale)
	 *
	 * dans ce cas reset les notes selectionnées
	 *
	 * @param mode
	 */
	setSearchMode(mode) {
		this.state.searchMode = mode
		this.state.detailsPanelMode = mode
		NoteStore.resetSelectedNotes()
	}

	/**
	 * selectionne un tableau de notes
	 * @param notes
	 * @param type
	 */
	selectNotes(notes, type = 'chord') {
		this.setSearchMode(type)
		NoteStore.setNotes(notes)
	}

}

export default new Setting()