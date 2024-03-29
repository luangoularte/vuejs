const express = require('express');
const db = require("./database");

const router = express.Router();

router.post("/clientes", async (req, res) => {
    try {
        const { nome, email } = req.body;
        await db.query("INSERT INTO clientes (nome, email) VALUES ($1, $2)", [nome, email]);
        res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

router.post("/burgers", async (req, res) => {
    try {
        const { nome, email, carne, pao, opcionais, status } = req.body;
        await db.query("INSERT INTO burgers (nome, email, carne, pao, opcionais, status) VALUES ($1, $2,$3, $4, $5, $6)", [nome, email, carne, pao, opcionais, status]);
        res.status(201).json({ message: "Burger criado com sucesso" });
    } catch (error) {
        console.error('Erro ao criar burger:', error);
        res.status(500).json({ error: 'Erro ao criar burger' });
    }
});

module.exports = router;
