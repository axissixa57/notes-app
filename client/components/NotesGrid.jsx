import React from 'react';

import Note from './Note.jsx';
import Masonry from 'react-masonry-component';

import './NotesGrid.less';

class NotesGrid extends React.Component {
    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10, // расстояние между колонками
            isFitWidth: true // стоит ли принимать ширину родителя
        };

        return (

            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.notes.map(note =>
                        <Note
                            key={note.id}
                            title={note.title}
                            onDelete={this.props.onNoteDelete.bind(null, note)}
                            color={note.color}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </Masonry>
        );
    }
}

export default NotesGrid;