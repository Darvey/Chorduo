import ChordStore from '../store/ChordStore';
import NoteStore from '../store/NoteStore';
import Setting from '../store/Settings';



class MIDIDevice{

    midiReleased = 0;

    constructor(){

        this.locked = false;

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(success.bind(this), failure);
        } 

        function success(midi) {
            midi.onstatechange = function(e) {   
                // Print information about the (dis)connected MIDI controller
                console.log(e.port.name, e.port.manufacturer, e.port.state);
            };
            var inputs = midi.inputs.values();
            // inputs is an Iterator
            for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
                //each time there is a midi message call the onMIDIMessage function
                input.value.onmidimessage = onMIDIMessage.bind(this);
            }
        }
        
        function failure() {
            console.error('No access to your midi devices.')
        }
    
        function onMIDIMessage(message) {
            var midiValue = message.data[1]%24;
            var name = ""
            // une touche est appuyée
            if (message.data[0] === 144 && message.data[2] > 0) {
                if ( this.locked == true ){
                    this.locked = false
                    NoteStore.resetSelectedNotes()
                }
                this.midiReleased = 0;
                NoteStore.toggleNote(midiValue)
                if ( ChordStore.state.chordFound != null ) {
                    name = ChordStore.state.chordFound.name
                    this.compare(name)
                }
            }
            // une touche est relachée
            if ( this.locked != true ){
                if (message.data[0] === 128 || message.data[2] === 0) {
                    this.midiReleased = 1;   
                    if(Setting.state.searchMode == "chord" ) NoteStore.toggleNote(midiValue);
                }
            }
        }

    }


    compare(name){
        setTimeout(() => {
            if ( name == ChordStore.state.chordFound.name ){
                this.locked = true
            }
        }, 2000); 
    }


}

export default new MIDIDevice()