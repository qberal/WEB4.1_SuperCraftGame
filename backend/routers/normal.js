
const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');
const Fusion = require('../model/fusion');
const { isAuthenticated } = require('../services/auth');
const {getNormalLeaderboard} = require("../model/leaderboard");


router.get('/getInventory', isAuthenticated, async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
    }
    const user_id = req.session.user.id;

    try {
        let userInventory = await Inventory.getUserInventory(user_id);

        userInventory = userInventory.map(item => {
            return {
                "id": item.item_id,
                "name": item.item_name,
                "icon": item.item_image
            };
        });

        res.json(userInventory);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'inventaire :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'inventaire.' });
    }
});


// Route pour obtenir l'item fusionné de deux items, si la fusion est possible (les 2 items dans linventaire , et compatible pr une fusion), alors le nouveau item est ajouté á linventaire
router.get('/getFusion', isAuthenticated, (req, res) => {
    // Récupérer l'ID de l'utilisateur, item1 et item2 depuis les paramètres de requête
    const user_id = req.session.user.id;
    const item1 = req.query.item1;
    const item2 = req.query.item2;

    // Vérifier que les paramètres sont bien fournis
    if (!user_id || !item1 || !item2) {
        return res.status(400).json({ message: 'Paramètres manquants (userId, item1, item2)' });
    }

    // Appeler la fonction FusionService pour obtenir les détails de l'item fusionné
    Fusion.getFusionItemDetails(user_id, item1, item2, (err, fusionItem) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        // Ajouter l'item fusionné à l'inventaire
        Inventory.addItemToInventory(user_id, fusionItem.id)
            .then(() => {
                console.log(`Item fusionné ajouté à l'inventaire : ${fusionItem.id} -> ${fusionItem.nom}`); // Exemple d'info log

                fusionRes = {
                    "id": fusionItem.id,
                    "name": fusionItem.nom,
                    "icon": fusionItem.img
                }

                return res.status(200).json( fusionRes );
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de l'item à l'inventaire :", error);
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'item à l'inventaire." });
            });
    });
});


router.get('/getScore', isAuthenticated, (req, res) => {
    const user_id = req.session.user.id;

    //returns score and max score, score = number of items in inventory, max score = number of items in the game
    Inventory.getUserInventory(user_id)
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

router.get('/getLeaderboard', isAuthenticated, (req, res) => {
    getNormalLeaderboard((err, scores) => {
        if (err) {
            console.error('Erreur lors de la récupération du leaderboard :', err);
            return res.status(500).json({ message: 'Erreur lors de la récupération du leaderboard.' });
        }
        res.json(scores);
    });
});


module.exports = router;
