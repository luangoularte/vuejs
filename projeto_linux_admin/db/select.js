const db = require("./database")

async function listData() {
    await db.connect()
    var result

    result = await db.query("SELECT * FROM paes")
    console.log("PÃES:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM carnes")
    console.log("CARNES:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM opcionais")
    console.log("OPCIONAIS:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM status")
    console.log("STATUS:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM burgers")
    console.log("BURGERS:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM clientes")
    console.log("CLIENTES:")
    consoler.log(result.rows)

    result = await db.query("SELECT * FROM status_pagamento")
    console.log("STATUS PAGAMENTO:")
    consoler.log(result.rows)
}

listData()