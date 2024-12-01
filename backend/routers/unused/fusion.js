const express = require('express');
const router = express.Router();
const Fusion = require('../../model/fusion');  // Assure-toi que ce chemin est correct
const Inventory = require('../../model/inventory');  // Assure-toi que ce chemin est correct


// Route pour obtenir l'item fusionné de deux items, si la fusion est possible (les 2 items dans linventaire , et compatible pr une fusion), alors le nouveau item est ajouté á linventaire
router.get('/normal', (req, res) => {
    // Récupérer l'ID de l'utilisateur, item1 et item2 depuis les paramètres de requête
    const userId = req.query.user_id || 1;
    const itemId1 = req.query.item1;
    const itemId2 = req.query.item2;

    // Vérifier que les paramètres sont bien fournis
    if (!userId || !itemId1 || !itemId2) {
        return res.status(400).json({ message: 'Paramètres manquants (userId, item1, item2)' });
    }

    // Appeler la fonction FusionService pour obtenir les détails de l'item fusionné
    Fusion.getFusionItemDetails(userId, itemId1, itemId2, (err, fusionItem) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        // Ajouter l'item fusionné à l'inventaire
        Inventory.addItemToInventory(userId, fusionItem.id)
            .then(() => {
                console.log(`Item fusionné ajouté à l'inventaire : ${fusionItem.id} -> ${fusionItem.nom}`); // Exemple d'info log
                return res.status(200).json({ fusionItem });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de l'item à l'inventaire :", error);
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'item à l'inventaire." });
            });
    });
});

// Route pour récupérer toutes les fusions
router.get('/All', (req, res) => {
    Fusion.getAll((err, fusions) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération des fusions', error: err });
        } else {
            res.json(fusions);
        }
    });
});



// Route pour récupérer une fusion par ID
router.get('/', (req, res) => {
    const fusionId  = req.query.fusionId;
    Fusion.findById(fusionId, (err, fusion) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de récupération de la fusion', error: err });
        } else if (fusion) {
            res.json(fusion);
        } else {
            res.status(404).json({ message: 'Fusion non trouvée' });
        }
    });
});



module.exports = router;
