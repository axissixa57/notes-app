import React from 'react';

import NotesActions from '../actions/NotesActions.js';
import NotesStore from '../stores/NotesStore.js';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './App.less';

// при возникновении события 'change' сработает эта ф-ция
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

    _onChange() {
        this.setState(getStateFromFlux());
    }

    // вызывается непосредственно перед рендерингом компонента
    componentWillMount() {
        NotesActions.loadNotes();
    }

    // вызывается после рендеринга компонента. 
    // здесь можно выполнять запросы к удаленным ресурсам
    // подписка на событие 'change' (в store) и указываем обработчик
    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    // вызывается перед удалением компонента из DOM
    // отписка от события 'change' в store
    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    // noteData - { text: '', title: '', color: '#FFFFFF' }
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
        );
    }

}

export default App;