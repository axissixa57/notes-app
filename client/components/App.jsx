import React from 'react';

import NotesActions from '../actions/NotesActions.js';
import NotesStore from '../stores/NotesStore.js';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

// ф-ция, кот. будет вызываться каждый раз когда будут происходить изменения в store (NotesStore.js), т.е. когда будет происходить emit('change')
function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromFlux();

        this._onChange = this._onChange.bind(this);
    }

    // вызывается непосредственно перед рендерингом компонента
    componentWillMount() {
        NotesActions.loadNotes();
    }

    // вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам
    // подписка на изменение в store
    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    // вызывается перед удалением компонента из DOM
    // отписка на изменение в store
    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    // сюда передаётся объект из NoteEditor.jsx - { text: '', title: '', color: '#FFFFFF' }
    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    }

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    }

    render() {
        return (
            <div className="App">
                <h2 className="App__header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} /> 
            </div>
            // this.handleNoteAdd, this.handleNoteDelete - ссылки на обработчик события
        );
    }

    // будет вызываться каждый раз, когда в store буду произведены изменения,
    // т.е. когда будет происходить emit('change') 
    _onChange() {
        this.setState(getStateFromFlux());
    }

}

export default App;