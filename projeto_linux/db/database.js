const pg = require('pg')
const { Client } = require('pg');

const client = new pg.Client ({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "admin",
    port: 5421
})

module.exports = client