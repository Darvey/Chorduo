import Vue from 'vue'

import * as func from '../tools/Functions.js'

import NoteStore from './NoteStore.js'
import Settings from './Settings.js'
import chordData from '../data/chords.json'
import notesData from '../data/notes.json'
import ScaleStore from './ScaleStore.js'


/*
 * Class ChordStore
 */
class ChordStore {

    constructor() {

        this.state = {
            // Contient l'accord trouvé avec les notes sélectionnées par l'utilisateur
            chordFound: null
        }
        // construction du tableau d'objets "Chord"
        this.chords = []

        var cnt = 0

        for (let root in chordData) {
            for (let type in chordData[root]) {
                for (let chord in chordData[root][type]) {
                    this.chords[cnt] = new Chord(
                        root,
                        chordData[root][type][chord].name,
                        chordData[root][type][chord].notes,
                        chordData[root][type][chord].fingerings,
                        chordData[root][type][chord].intervals
                    )
                    cnt++
                }
            }
        }
    }
    
    /**
     * [setChordFound]
     *
     * Actualise la liste d'accord trouvés
     */
    setChordFound() {
        // parcours du tableau des notes sélectionnées (booleens) pour créer un tableau de notes correspondantes
        var notes = []
        for (let i = 0; i < 24; i++) {
            if (NoteStore.state.selectedNotes[i] == true) {
                if (!notes.includes((i+1)%12) ) {
                    notes.push((i+1)%12);
                }
            }
        }
        this.state.chordFound = this.getChordWithNotes(notes)
        console.log(this.state.chordFound)
    }

    /**
     * [getChordWithNotes]
     *
     * Retourne l'accord trouvé avec les notes passées en parametre
     * ou null si aucun accord n'a été trouvé
     *
     * @param  {Array<number>}              pNotes : liste de notes
     * @return  {Chord}
     */
    getChordWithNotes(pNotes) {

        // compteur des notes équivalentes dans les deux tableaux
        var cntEquivalence = 0

        // parcours liste d'accords
        for (let i = 0; i < this.chords.length; i++) {
            // si l'accord contient le même nombre de notes que le tableau passé en parametre
            if (this.chords[i].notes.length == pNotes.length) {
                cntEquivalence = 0
                // On compare les notes une à une pour voir si elles sont toutes correspondantes
                for (let j = 0; j < pNotes.length; j++) {
                    if (this.chords[i].notes[j] == pNotes[j]) {
                        cntEquivalence++
                        // Si toutes les notes correspondent
                        if (cntEquivalence == pNotes.length) {
                            return this.chords[i]
                        }
                    }
                }
            }
        }
        // Si aucun accord ne correspond on retourne la valeur null
        return null
    }
}

/**
 * Class Chord
 * 
 * @property {number}                       root : nombre définissant la note fondamentale de l'accord
 * @property {number}                       name : nom de l'accord sous forme de nombre
 * @property {Array<umber>}                 notes : tableau de notes sous forme de nombre
 * @property {Array<Fingering>}             fingerings : tableau des différents doigtés possible à la guitare
 * @property {Array<number>}                intervals : tableau des intervals entre les notes de l'accord
 * 
 */
class Chord {

    constructor(pRoot, pName, pNotes, pFingerings, pIntervals) {

        this.root = pRoot
        this.name = pName
        this.notes = pNotes
        this.intervals = pIntervals
        this.fingerings = []

        // construction du tableau d'objets "Fingering"
        for (let i=0 ; i<pFingerings.length ; i++) {

            let min = 100
            let dots = []
            let dotNote
            let dotColor
            let dotFret
            let dotFretInDiagram

            for (let j=0 ; j<pFingerings[i].length ; j++) {
                if (pFingerings[i][j] < min && pFingerings[i][j] != "x") min = parseInt(pFingerings[i][j])
            }

            if (min == 0) min = 1

            for (let j=0 ; j<pFingerings[i].length ;j++) {
                if (pFingerings[i][j] != "x") {
                    dotNote = ((Settings.state.guitarTuning[j] + parseInt(pFingerings[i][j])) % 12) + 1
                    dotColor = Settings.state.dotsColor[ this.intervals[this.notes.indexOf(dotNote)] ]
                    dotFret = parseInt(pFingerings[i][j])
                    dotFretInDiagram = pFingerings[i][j] - min + 1
                } else {
                    dotNote = 13
                    dotColor = "none"
                    dotFret = 0
                    dotFretInDiagram = 0
                }
                dots.push(new Dot(dotNote,dotColor,dotFret,dotFretInDiagram))
            }
            this.fingerings.push(new Fingering(min,dots,i))
        }

    }

    /**
     * [getRealName]
     *
     * @return {string}  nom réel de l'accord
     */
    getRealName() {
        var rootNote = Settings.state.realNotesNames[this.root-1]
        var realName = rootNote + this.name
        return func.realMusicSymbol(realName)
    }

    /**
     * [getFullName]
     *
     * @return {string}  nom complet de l'accord
     */
    getFullName() {
        var rootNote = Settings.state.realNotesNames[this.root-1]
        var realName = rootNote + this.name
        return realName
    }

    

    /**
     * [getRealNotesName]
     *
     * @return {Array<string>}  tableau contenant le nom réel de chaque note
     */
    getRealNotesName() {
        var result = []
        for (let note in this.notes) {
            result.push(Settings.state.realNotesNames[this.notes[note]-1])
        }
        return result
    }

    getDegree(scale) {

        var degree;

        for(let i=0; i<scale.notes.length ; i++){
            if(scale.notes[i]==this.root) degree = i;
        }
        let romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
        return romans[degree]
    }
}

/**
 * Class Fingering
 * 
 * @property    {number}            higherFret : la frette la plus proche de la tête de la guitare
 * @property    {Array<Dot>}        dots : tableau de dots
 * 
 */
class Fingering {
    /**
     * Constructeur de la classe
     */
    constructor(pHigherFret, pDots, pKey) {
        this.higherFret = pHigherFret
        this.dots = pDots
        this.key = JSON.stringify(this.dots)
    }
}

/**
 * Class Dot
 * 
 * @property {string}               color : couleur de la dot
 * @property {number}               note : note sous forme de nombre
 * @property {number}               fret : frette sur laquelle est positionnée la dot sur le manche
 * @property {number}               diagramFret : frette sur laquelle est positionné la dot sur le diagramme
 * 
 */
class Dot {
    constructor(
        pNote,
        pColor,
        pFret,
        pDiagramFret
    ) {
        this.color = pColor
        this.fret = pFret
        this.fretInDiragram = pDiagramFret
        this.note = pNote
    }
    
    /**
    * [getRealName]
    * 
    * retourne le nom de la dot pour l'affichage
    */
    getRealName(){
        return Settings.state.realNotesNames[this.note-1]
    }
}

export default new ChordStore()