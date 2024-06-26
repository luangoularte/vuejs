const express = require('express');
const db = require("./database");

const router = express.Router();


router.post("/clientes", async (req, res) => {
    try {
        const { acao, nome, email, senha } = req.body;

        if (acao === "cadastrar") {
            await db.query("INSERT INTO clientes (nome, email, senha) VALUES ($1, $2, $3)", [nome, email, senha]);
            res.status(201).json({ message: "Cliente cadastrado com sucesso" });
        } else if (acao === "login") {
            const result = await db.query("SELECT * FROM clientes WHERE email = $1 AND senha = $2", [email, senha]);
            if (result.rows.length > 0) {
                res.status(200).json({ message: "Logado com sucesso", cliente: result.rows[0] });
            } else {
                res.status(401).json({ error: 'Email ou senha incorretos' });
            }
        } else {
            res.status(400).json({ error: 'Ação inválida' });
        }
    } catch (error) {
        console.error('Erro ao processar requisição:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post("/admin", async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await db.query("SELECT * FROM admin WHERE email = $1 AND senha = $2", [email, senha]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: "Logado com sucesso", cliente: result.rows[0] });
        } else {
            res.status(401).json({ error: 'Email ou senha incorretos' });
        }
        
    } catch (error) {
        console.error('Erro ao processar requisição:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
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
