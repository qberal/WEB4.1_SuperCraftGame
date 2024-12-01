const express = require('express');
const Item = require('../../model/item');  // Assurez-vous que le chemin d'importation est correct
const router = express.Router();

// Trouver un item par ID
router.get('/', (req, res) => {
    const itemId = req.query.itemId;
    
    Item.findById(itemId, (err, item) => {
        if (err) {
            console.log("Error fetching item by ID:", err);
            if (err.kind === "not_found") {
                res.status(404).send("Item not found.");
            } else {
                res.status(500).send("Error fetching item.");
            }
        } else {
            res.json(item);
        }
    });
});


// tous les items 
router.get('/All', (req, res) => {
    Item.getAll((err, fusions) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération des fusions', error: err });
        } else {
            res.json(fusions);
        }
    });
});



module.exports = router;
