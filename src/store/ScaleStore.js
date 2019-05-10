import * as func from '../tools/Functions.js'
import Settings from './Settings.js'
import NoteStore from './NoteStore.js'
import ChordStore from './ChordStore.js'

import chordsData from '../data/chords.json';
import notesData from '../data/notes.json';
import scalesData from '../data/scales.json';


/* 
 * Class Scales
 */
class Scales {

	constructor() {

		this.state = {
			scalesFound: undefined,
			selectedScale: undefined
		}

		this.scales = []

		// Variables utilisés seulement pour la construction des déclinaisons des différentes gammes
		var intervals = []
		var name = "";
		var notes = [];
		var rootNote
		var cnt = 0;

		for (var i = 0; i < scalesData.scales.length; i++) {

			intervals = scalesData.scales[i][1];

			// Une itération par déclinaison de gamme
			for (var j = 0; j < 12; j++) {

				// on vide la liste de notes
				notes = [];
				// nom de la gamme
				name = scalesData.scales[i][0][0];
				// Note fondamentale
				rootNote = j + 1

				for (var k = 0; k < intervals.length; k++) {
					// remplacement des intervals par le nom des notes
					notes[k] = (j + intervals[k]) % 12 + 1
				}
				this.scales[cnt] = new Scale(name, notes, rootNote, intervals);
				cnt++
			}
		}
	}

	setScalesFound() {
		var notes = []
		for (let i = 0; i < 12; i++) {
			if (NoteStore.state.selectedNotes[i] == true) {
				notes.push(i + 1);
			}
		}
		this.state.scalesFound = this.getScalesWithNotes(notes)
		if (this.state.scalesFound != undefined) {
			console.log(this.state.scalesFound[0].getChordsHarmonization(3))
		}
	}


	/**
	 * [getScalesWithNotes]
	 * Retourne les gammes qui contiennent exactement les notes passées en parametre
	 *
	 * @param    {Array<char>}    pNotes notes des gammes à retrouver
	 * @returns  {Array<Scales>}  gammes
	 */
	getScalesWithNotes(pNotes) {

		var result = []
		var cnt = 0

		for (let i = 0; i < this.scales.length; i++) {
			if (this.scales[i].notes.length == pNotes.length) {
				if (func.arrayContainsArray(this.scales[i].notes, pNotes)) {
					result[cnt] = this.scales[i]
					cnt++
				}
			}
		}
		if (cnt == 0) return undefined
		return result;
	}

	/**
	 * [getScaleIndex]
	 * retourne l'index d'une gamme dont le nom a été passé en parametre
	 *
	 * @param  {String} pScaleName nom de la gamme
	 */
	getScaleIndex(pScaleName) {

		for (var i = 0; i < this.scales.length; i++) {
			if (this.scales[i].name == pScaleName) {
				return i;
			}
		}
	}

	/**
	 * [getScale]
	 * retourne une instance de la gamme dont le nom a été passé en parametre
	 *
	 * @param  {String} pScaleName nom de la gamme
	 */
	getScale(pScaleName) {

		for (var i = 0; i < this.scales.length; i++) {
			if (this.scales[i].name == pScaleName) {
				return this.scales[i];
			}
		}
	}

	/**
	 * [getScalesWithChord]
	 *
	 * retourne la liste des gammes contenant l'accord passé en parametre.
	 * Si range n'est pas défini, la recherche s'éffectue sur toutes les gammes
	 *
	 * @param  {Chord} pChord accord
	 * @param  {Array<Scales>} range liste de gammes
	 */

	getScalesWithChord(pChord, range) {

		if (range == undefined) {
			var range = [];
			for (let i = 0; i < this.scales.length; i++) {
				range[i] = i;
			}
		}
		var result = [];
		for (let i = 0; i < range.length; i++) {
			if (func.arrayContainsArray(this.scales[range[i]].notes, pChord.notes)) {
				result.push(this.scales[range[i]]);
			}
		}
		console.log(result)
		return result;
	}


	/**
	 * [getScalesWithChords]
	 * retourne les gammes qui contiennent l'ensemble des accords passés en parametre.
	 *
	 * @param  {Chord} pChords liste d'accords
	 */
	getScalesWithChords(pChords) {

		var result = this.getScalesWithChord(pChords[0]);

		for (var i = 1; i < pChords.length; i++) {
			result = this.getScalesWithChord(pChords[i], result);
		}

		return result;
	}


	/**
	 * [searchInScale]
	 * retourne la liste des gammes contenant le terme passé en parametre
	 *
	 * @param  {String} pString terme à rechercher
	 */
	searchInScales(pString) {

		var res = [];
		pString = pString.toLowerCase()

		for (var i = 0; i < this.scales.length; i++) {
			var scaleName = this.scales[i].name.toLowerCase()
			if (scaleName.search(pString) != -1) {
				res += this.scales[i].name
			}
		}

		return res
	}

}

/**
 *  Class Scale
 *
 *  @property  {string}             name nom de la gamme
 *  @property  {Array<number>}      notes tableau contenant chacune des notes de la gamme sous forme de nombre
 *  @property  {number}             rootNote note fondamentale de la gamme
 *  @property  {Array<intervals>}   intervals tableau contenant les intervals qui définissent la gamme
 *
 */

class Scale {

	constructor(pName, pNotes, pRootNote, pIntervals) {
		this.name = pName
		this.notes = pNotes
		this.rootNote = pRootNote
		this.intervals = pIntervals
	}

	/**
	 * [realNotes]
	 *
	 * Retourne un tableau de notes dont les noms correspondent aux alterations
	 * définies dans le langage défini
	 *
	 *
	 * @returns {Array<string>}
	 */
	getRealNotes() {

		var notes = []
		var alteration

		for (let i = 0; i < this.notes.length; i++) {
			alteration = Settings.state.notesAlterations[this.notes[i] - 1]
			notes[i] = func.realMusicSymbol(notesData[this.notes[i]][Settings.state.lang][alteration]);
		}
		return notes
	}

	/**
	 * [getRealName]
	 *
	 * Retourne le nom de la gamme suivant les altérations définies
	 *
	 * @returns {String}
	 */
	getRealName() {
		var alteration = Settings.state.notesAlterations[this.rootNote - 1]
		var rootNote = func.realMusicSymbol(notesData[this.rootNote][Settings.state.lang][alteration])
		return rootNote + " " + this.name
    }
    
    /**
	 * [getFullName]
	 *
	 * Retourne le nom complet de la gamme pour la recherche
	 *
	 * @returns {String}
	 */
	getFullName() {
		var alteration = Settings.state.notesAlterations[this.rootNote - 1]
		var rootNote = notesData[this.rootNote][Settings.state.lang][alteration]
		return rootNote + " " + this.name
	}

	/**
	 * [getMatchingChords]
	 *
	 *
	 * @returns {Array<chords>}
	 */
	getMatchingChords() {
		var result = []
		for (let i = 0; i < ChordStore.chords.length; i++) {
			if (func.arrayContainsArray(this.notes, ChordStore.chords[i].notes)) {
				result.push(ChordStore.chords[i]);
			}
		}
		return result
	}

	/**
	 * [getChordsHarmonization]
	 *
	 * Retourne une liste d'accords issues d'une harmonisation de la gamme
	 *
	 * @param   {number}    pNb nombre de note des accords
	 * @returns {Array<chords>}
	 */
	getChordsHarmonization(pNb) {
		var result = []
		var notes = []
		var scLength = this.notes.length

		for (let i = 0; i < scLength; i++) {
			for (let n = 0; n < pNb; n++) {
				notes[n] = this.notes[(i + 2 * n) % scLength];
			}
			result[i] = ChordStore.getChordWithNotes(notes);
			notes = [];
		}
		return result;
	}

	getNotePosition(note) {
		let index = this.notes.indexOf(parseInt(note))
		let romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
		return romans[index]
	}

}

export default new Scales()