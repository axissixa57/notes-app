import React from 'react';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

// устаревший способо + нерабочий
// const App = React.createClass({
//     render() {
//         return <h1>Notes</h1>;
//     }
// });

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h2 className="App_header">NotesApp</h2>
                <NoteEditor /> 
                <NotesGrid /> 
            </div>
        );
        
        // onNoteAdd={this.handleNoteAdd}
        // notes={this.state.notes} onNoteDelete={this.handleNoteDelete}
    }
}

export default App;