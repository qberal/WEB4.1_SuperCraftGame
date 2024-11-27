const express = require('express');
const Item = require('../model/item');  // Assurez-vous que le chemin d'importation est correct
const router = express.Router();

// Trouver tous les items fusionnables
router.get('/fusionnables', (req, res) => {
    Item.findByFusionnable((err, items) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération des items fusionnables', error: err });
        } else {
            res.json(items);
        }
    });
});




// Trouver un item par ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    Item.findById(id, (err, item) => {
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

// Trouver un item par nom
router.get('/nom/:nom', (req, res) => {
    const nom = req.params.nom;
    
    Item.findByNom(nom, (err, item) => {
        if (err) {
            console.log("Error fetching item by name:", err);
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
router.get('/', (req, res) => {
    Item.getAll((err, fusions) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération des fusions', error: err });
        } else {
            res.json(fusions);
        }
    });
});



module.exports = router;
