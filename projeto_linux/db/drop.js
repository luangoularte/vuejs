const db = require("./database")

async function dropTables() {
    await db.connect()
    await db.query(`DROP TABLE paes CASCADE`)
    await db.query(`DROP TABLE carnes CASCADE`)
    await db.query(`DROP TABLE opcionais CASCADE`)
    await db.query(`DROP TABLE status CASCADE`)
    await db.query(`DROP TABLE burgers CASCADE`)
    await db.query(`DROP TABLE clientes CASCADE`)

    await db.end()

    console.log("Tabelas removidas")
}

dropTables()