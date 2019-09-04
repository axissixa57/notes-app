import mongoose from 'mongoose';

import '../models/Note';

import config from '../../etc/config.json';

const Note = mongoose.model('Note');

export function setUpConnection() {
    // mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });
    mongoose.connect('mongodb+srv://Ax1S:niW2GScgBXO5tjgS@wmscluster-0jm4z.mongodb.net/notes?retryWrites=true&w=majority', { useNewUrlParser: true });
}

export function listNotes() {
    return Note.find(); 
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save(); // сохранение в базу
}

export function deleteNote(id) {
    return Note.findById(id).deleteOne(); // удаление из коллекции в бд
}

// каждый из методов встроенных в mongoose возращает Promise object