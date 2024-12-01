const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');


router.get('/', async (req, res) => {
    const user_id = req.query.user_id || 1; // Utilise le user_id passé en query, ou 1 par défaut

    try {
        const userInventory = await Inventory.getUserInventory(user_id);
        res.json({ inventory: userInventory });
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'inventaire :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'inventaire.' });
    }
});


module.exports = router;
