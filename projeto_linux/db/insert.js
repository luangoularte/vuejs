const db = require("./database")

async function insertData() {

    await db.connect()


    const queryPaes = "INSERT INTO paes (tipo) VALUES ($1)"

    await db.query (queryPaes, ['Italiano Branco'])
    await db.query (queryPaes, ['3 Queijos'])
    await db.query (queryPaes, ['Parmesão e Orégano'])
    await db.query (queryPaes, ['Integral'])



    const queryCarnes = "INSERT INTO carnes (tipo) VALUES ($1)"

    await db.query (queryCarnes, ['Maminha'])
    await db.query (queryCarnes, ['Alcatra'])
    await db.query (queryCarnes, ['Picanha'])
    await db.query (queryCarnes, ['Veggie burger'])


    const queryOpcionais = "INSERT INTO opcionais (tipo) VALUES ($1)"

    await db.query (queryOpcionais, ['Bacon'])
    await db.query (queryOpcionais, ['Cheddar'])
    await db.query (queryOpcionais, ['Salame'])
    await db.query (queryOpcionais, ['Tomate'])
    await db.query (queryOpcionais, ['Cebola roxa'])
    await db.query (queryOpcionais, ['Pepino'])


    const queryStatus = "INSERT INTO status (tipo) VALUES ($1)"

    await db.query (queryStatus, ['Solicitado'])
    await db.query (queryStatus, ['Em produção'])
    await db.query (queryStatus, ['Finalizado'])


    await db.end()

    console.log("Dados inseridos");

}

insertData()