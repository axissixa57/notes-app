// Actions — хелперы, упрощающие передачу данных Диспетчеру
// Это набор методов, которые вызываются из Представлений (или из любых других мест), чтобы отправить Действия Диспетчеру. 
// В реализации Facebook Действия различаются по типу — константе, которая посылается вместе с данными действия. 
// В зависимости от типа, Действия могут быть соответствующим образом обработаны в зарегистрированных обработчиках, при этом данные из этих Действий используются как аргументы внутренних методов.

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const NoteActions = {
    loadNotes() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });

        api.listNotes()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_SUCCESS,
                notes: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_FAIL,
                error: err
            })
        );
    },

    createNote(note) {
        api.createNote(note)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteNote(noteId) {
        api.deleteNote(noteId)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default NoteActions;

// actions обращается к api