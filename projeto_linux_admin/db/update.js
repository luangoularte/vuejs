const express = require('express');
const db = require("./database");


const router = express.Router();


router.patch('/burgers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status_pagamento, status } = req.body;

        
        if (status_pagamento) {
            result = await db.query('UPDATE burgers SET status_pagamento = $1 WHERE id = $2 RETURNING *', [status_pagamento, id]);
        } else if (status) {
            result = await db.query('UPDATE burgers SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
        } else {
            return res.status(400).json({ error: 'Requisição inválida: nenhum campo de status fornecido' });
        }
        
        if (result.rows.length > 0) {
            const updatedBurger = result.rows[0];
            res.status(200).json(updatedBurger);
        } else {
            res.status(404).json({ error: 'Burger não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o burger:', error);
        res.status(500).json({ error: 'Erro ao atualizar o burger' });
    }
});

module.exports = router;