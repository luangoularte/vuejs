const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const get = require('./get');
const post = require('./post');
const delete1 = require('./delete');
const update = require('./update');
const db = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

db.connect();

app.use('/', get);
app.use('/', post);
app.use('/', delete1);
app.use('/', update);


const porta = 4000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}\n`);
    console.log("ENDPOINTS:")
    console.log(`http://localhost:${porta}/ingredientes`);
    console.log(`http://localhost:${porta}/status`);
    console.log(`http://localhost:${porta}/burgers`);
    console.log(`http://localhost:${porta}/clientes`);
    console.log(`http://localhost:${porta}/admin`);
    console.log(`http://localhost:${porta}/status_pagamento`);
});
