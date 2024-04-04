const express = require('express');
const db = require("./database");

const router = express.Router();

const ingredientes = ["paes", "carnes", "opcionais"];
const tables = ['status', 'burgers', 'clientes', 'admin'];

router.get("/ingredientes", async (req, res) => {
    try {
        var ingredientesData = {};

        for (const ingrediente of ingredientes) {
            var result = await db.query(`SELECT * FROM ${ingrediente}`);
            ingredientesData[ingrediente] = result.rows;
        }

        res.json(ingredientesData);
    } catch (error) {
        console.error(`Erro ao buscar dados de ingredientes:`, error);
        res.status(500).json({ error: `Erro ao buscar dados de ingredientes:` });
    }
});

tables.forEach(table => {
    router.get(`/${table}`, async (req, res) => {
        try {
            var result = await db.query(`SELECT * FROM ${table}`);
            res.json(result.rows);
        } catch (error) {
            console.error(`Erro ao buscar dados de ${table}:`, error);
            res.status(500).json({ error: `Erro ao buscar dados de ${table}:` });
        }
    });
});

router.get('/burgers/:email', async (req, res) => {
    try {
        const email = req.params.email;
        var result = await db.query(`SELECT * FROM burgers WHERE email = $1`, [email]);
        res.json(result.rows);
    } catch (error) {
        console.error(`Erro ao buscar dados de burgers:`, error);
        res.status(500).json({ error: `Erro ao buscar dados de burgers:` });
    }
});



module.exports = router;
