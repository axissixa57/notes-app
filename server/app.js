import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors'; // если использовать пакет cors, то middleware будет таким:
// Allow requests from any origin
// app.use(cors({ origin: '*' })); // * - любой origin

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js'; // * позволяет импортировать все методы из файла, кот. помечены export

// Set up connection of database
db.setUpConnection(); // соединение с бд

// Initialization of express application
const app = express();

// Using bodyParser middleware
app.use(bodyParser.json()); // нужен для того чтобы каждый раз не преобразовывать json к js объекту. Например пользователь посылает запрос(post), этот запрос идёт ввиде "сырых данных", а bodyParser преобразует их js object. app .use() - это middleware(промежуточный обработчик), помогает преобразовать данные к некоторому виду

// так как User Interface (UI) - http://127.0.0.1:8090/ and BackAnd - http://localhost:8080 находятся на разных Origin-ах
// CORS on ExpressJS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); // если не написать будет ошибка Origin <origin> is not allowed by Access-Control-Allow-Origin

// RESTful api handlers
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