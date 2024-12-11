
const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');
const Fusion = require('../model/fusion');
const { isAuthenticated } = require('../services/auth');
const {getNormalLeaderboard} = require("../model/leaderboard");

/**
 * Route to get the inventory of the user
 */
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


/**
 * Route to get the fusion of two items
 */
router.get('/getFusion', isAuthenticated, (req, res) => {
    const user_id = req.session.user.id;
    const item1 = req.query.item1;
    const item2 = req.query.item2;

    if (!user_id || !item1 || !item2) {
        return res.status(400).json({ message: 'Paramètres manquants (userId, item1, item2)' });
    }

    Fusion.getFusionItemDetails(user_id, item1, item2, (err, fusionItem) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        Inventory.addItemToInventory(user_id, fusionItem.id)
            .then(() => {
                console.log(`Item fusionné ajouté à l'inventaire : ${fusionItem.id} -> ${fusionItem.nom}`); // Exemple d'info log

                fusionRes = {
                    "id": fusionItem.id,
                    "name": fusionItem.nom,
                    "icon": fusionItem.img,
                    "fusionnable": fusionItem.fusionnable
                }

                return res.status(200).json( fusionRes );
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de l'item à l'inventaire :", error);
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'item à l'inventaire." });
            });
    });
});


/**
 * Route to get the score of the user
 */
router.get('/getScore', isAuthenticated, (req, res) => {
    const user_id = req.session.user.id;

    Inventory.getUserInventory(user_id)
        .then(inventory => {

            let score = inventory.length;
            let maxScore = 0;

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

/**
 *
 */
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
