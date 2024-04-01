const pg = require('pg')
const { Client } = require('pg');

const client = new pg.Client ({
    user: "postgres",
    host: "postgres-db",
    database: "postgres",
    password: "admin",
    port: 5432
})

module.exports = client