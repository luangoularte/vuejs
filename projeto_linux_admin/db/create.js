const db = require("./database")

async function createTables() {
    await db.connect()

    await db.query(`CREATE TABLE paes(
        id serial PRIMARY KEY,
        tipo VARCHAR (58) NOT NULL
    )`)

    await db.query(`CREATE TABLE carnes(
        id serial PRIMARY KEY,
        tipo VARCHAR (58) NOT NULL
    )`)

    await db.query(`CREATE TABLE opcionais(
        id serial PRIMARY KEY,
        tipo VARCHAR (58) NOT NULL
    )`)

    await db.query(`CREATE TABLE status(
        id serial PRIMARY KEY,
        tipo VARCHAR (58) NOT NULL
    )`)

    await db.query(`CREATE TABLE burgers(
        id serial PRIMARY KEY,
        nome VARCHAR (58) NOT NULL,
        email VARCHAR (100) NOT NULL,
        carne VARCHAR (50) NOT NULL,
        pao VARCHAR (50) NOT NULL,
        opcionais TEXT NOT NULL,
        status VARCHAR (50) NOT NULL
    )`)

    await db.query(`CREATE TABLE clientes(
        id serial PRIMARY KEY,
        nome VARCHAR (58) NOT NULL,
        email VARCHAR (100) NOT NULL,
        senha VARCHAR (58) NOT NULL
    )`)
    
    await db.query(`CREATE TABLE admin(
        id serial PRIMARY KEY,
        email VARCHAR (58) NOT NULL,
        senha VARCHAR (100) NOT NULL
    )`)

    await db.end()

    console.log("Tabelas criadas")
}

createTables()