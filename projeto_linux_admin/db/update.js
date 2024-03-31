const express = require('express');
const db = require("./database");


const router = express.Router();


router.patch('/burgers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        
        const result = await db.query('UPDATE burgers SET status = $1 WHERE id = $2 RETURNING *', [status, id]);

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