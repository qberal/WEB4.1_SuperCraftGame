
const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');
const Fusion = require('../model/fusion');


router.get('/getInventory', async (req, res) => {
    const user_id = req.query.user_id || 1; // Utilise le user_id passé en query, ou 1 par défaut

    try {
        let userInventory = await Inventory.getUserInventory(user_id);

        userInventory = userInventory.map(item => {
            return {
                "id": item.item_id,
                "name": item.item_name,
                "icon": item.item_image
            };
        });

        console.log(`Inventaire de l'utilisateur ${user_id} :`, userInventory);

        res.json(userInventory);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'inventaire :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'inventaire.' });
    }
});


// Route pour obtenir l'item fusionné de deux items, si la fusion est possible (les 2 items dans linventaire , et compatible pr une fusion), alors le nouveau item est ajouté á linventaire
router.get('/getFusion', (req, res) => {
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

                fusionRes = {
                    "id": fusionItem.id,
                    "name": fusionItem.nom,
                    "icon": fusionItem.image
                }

                return res.status(200).json( fusionRes );
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de l'item à l'inventaire :", error);
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'item à l'inventaire." });
            });
    });
});


router.get('/getScore', (req, res) => {
    const userId = req.query.user_id || 1;

    //returns score and max score, score = number of items in inventory, max score = number of items in the game
    Inventory.getUserInventory(userId)
        .then(inventory => {

            let score = inventory.length;
            let maxScore = 0;

            // Get the number of items in the game
            Inventory.getAllItems()
                .then(items => {
                    maxScore = items.length;
                    res.json({ score, maxScore });
                })
                .catch(err => {
                    console.error('Erreur lors de la récupération des items :', err);
                    res.status(500).json({ error: 'Erreur lors de la récupération des items.' });
                });
        })
        .catch(err => {
            console.error('Erreur lors de la récupération de l\'inventaire :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'inventaire.' });
        });
});


module.exports = router;
