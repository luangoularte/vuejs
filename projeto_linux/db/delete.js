const express = require('express');
const db = require("./database");


const router = express.Router();


router.delete(`/burgers/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM burgers WHERE id = $1', [id]);
        res.status(201).json({ message: "Burger excluído com sucesso" });
    } catch (error) {
        console.error('Erro ao excluir o burger:', error);
        res.status(500).json({ error: 'Erro ao excluir o burger' });
    }
});


module.exports = router;