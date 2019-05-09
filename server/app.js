import express from 'express';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js'; // * позволяет импортировать все методы из файла, кот. помечены export

db.setUpConnection(); // соединение с бд

const app = express();

app.use(bodyParser.json()); // нужен для того чтобы каждый раз не преобразовывать json к js объекту. Например пользователь посылает запрос(post), этот запрос идёт ввиде "сырых данных", а bodyParser преобразует их js object. app .use() - это middleware(промежуточный обработчик), помогает преобразовать данные к некоторому виду

app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data)); // после создания заметки будет отправлена сама же созданная заметка и она же будет оправлена с нашего API
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});