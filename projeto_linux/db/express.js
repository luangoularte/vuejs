const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const get = require('./get');
const post = require('./post');
const db = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

db.connect();

app.use('/', get);
app.use('/', post);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}\n`);
    console.log("ENDPOINTS:")
    console.log('http://localhost:3000/ingredientes');
    console.log('http://localhost:3000/status');
    console.log('http://localhost:3000/burgers');
    console.log('http://localhost:3000/clientes');
});
