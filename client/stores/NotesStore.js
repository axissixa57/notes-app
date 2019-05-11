// Хранилища в Flux управляют состоянием определенных частей предметной области вашего приложения. 
// На более высоком уровне это означает, что Хранилища хранят данные, методы получения этих данных и зарегистрированные в Диспетчере обработчики Действий.

import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

// Самое важное, что мы сделали — добавили к нашему хранилищу возможности EventEmitter из NodeJS. 
// Это позволяет хранилищам слушать и рассылать события, что, в свою очередь, позволяет компонентам представления обновляться, отталкиваясь от этих событий. 
// Так как наше представление слушает событие «change», создаваемое Хранилищами, оно узнаёт о том, что состояние приложения изменилось, и пора получить (и отобразить) актуальное состояние.

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: note.color || '#ffffff',
        createdAt: note.createdAt
    };
}

// Метод Object.assign() используется для копирования значений всех собственных перечисляемых свойств из одного или более исходных объектов в целевой объект. 
// После копирования он возвращает целевой объект.
const TasksStore = Object.assign({}, EventEmitter.prototype, { 
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    emitChange() {
        this.emit(CHANGE_EVENT); // необходим чтобы стригеррить обновление react component
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Также мы зарегистрировали обработчик в нашем AppDispatcher с помощью его метода register. 
// Это означает, что теперь наше Хранилище теперь слушает оповещения от AppDispatcher. 
// Исходя из полученных данных, оператор switch решает, можем ли мы обработать Действие. 
// Если действие было обработано, создается событие «change», и Представления, подписавшиеся на это событие, реагируют на него обновлением своего состояния

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map( formatNote ); // форматирует данные
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;