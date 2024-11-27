const express = require('express');
const router = express.Router();
const Fusion = require('../model/fusion');  // Assure-toi que ce chemin est correct



// pour savoir si 2 items sont fusionnables
router.get('/check/:item1/:item2', (req, res) => {
    const item1 = req.params.item1;
    const item2 = req.params.item2;

    Fusion.isFusionPossible(item1, item2, (err, isPossible) => {
        if (err) {
            console.log("Error checking fusion possibility:", err);
            res.status(500).send("Server error");
            return;
        }

        if (isPossible) {
            res.send("Fusion possible !");
        } else {
            res.send("Fusion non possible.");
        }
    });
});


// retourne litem de la fusion de 2 items
router.get('/:item1/:item2', (req, res) => {
    const item1 = req.params.item1;
    const item2 = req.params.item2;

    Fusion.getFusionItems(item1, item2, (err, fusionItem) => {
        if (err) {
            console.log("Error fetching fusion items:", err);
            res.status(500).send("Error fetching fusion items.");
            return;
        }

        if (fusionItem) {
            res.json(fusionItem);
        } else {
            res.status(404).send("Fusion items not found.");
        }
    });
});



// Route pour récupérer toutes les fusions
router.get('/', (req, res) => {
    Fusion.getAll((err, fusions) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération des fusions', error: err });
        } else {
            res.json(fusions);
        }
    });
});

// Route pour récupérer une fusion par ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Fusion.findById(id, (err, fusion) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération de la fusion', error: err });
        } else if (fusion) {
            res.json(fusion);
        } else {
            res.status(404).json({ message: 'Fusion non trouvée' });
        }
    });
});

// Route pour supprimer une fusion par ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Fusion.deleteById(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de suppression de la fusion', error: err });
        } else if (result && result.kind === 'not_found') {
            res.status(404).json({ message: 'Fusion non trouvée' });
        } else {
            res.json({ message: `Fusion supprimée avec succès, ID: ${id}` });
        }
    });
});

module.exports = router;
