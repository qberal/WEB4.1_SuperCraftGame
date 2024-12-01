const Infinity = require('../services/infinity');
const InfinityInventory = require('../model/infinityInventory');
const Leaderboard = require('../model/leaderboard');
const express = require("express");  // Assurez-vous que le chemin d'importation est correct
const router = express.Router();

router.get("/generate", async (req, res) => {
    try {
        const user_id = req.query.user_id || 1;
        const item1 = req.query.item1;
        const item2 = req.query.item2;

        //TODO : vérifier si les items existent dans l'inventaire infini de l'utilisateur
        // Vérification des items dans l'inventaire
        const item1Exists = await InfinityInventory.checkItem(user_id, item1);
        const item2Exists = await InfinityInventory.checkItem(user_id, item2);

        if (!item1Exists || !item2Exists) {
            return res.status(404).send("One or both items not found in inventory.");
        }


        const fusions = await Infinity.getFusions(item1, item2);

        if (!fusions) {
            return res.status(404).send("Fusions not found.");
        }

        InfinityInventory.addItem(user_id, fusions.name, fusions.icon, result => {});

        res.json(fusions);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/getWordOfTheDay", (req, res) => {
    const word = Infinity.getWordOfTheDay();
    res.json({"word": word});
});

router.get("/getInventory", (req, res) => {
    //TODO: ce sera pas ici mais dans le middleware d'authentification que l'on va chercher l'id de l'utilisateur
    const user_id = req.query.user_id || 1;

    InfinityInventory.findByUserId(user_id, (err, inventory) => {
        if (err) {
            console.log("Error fetching inventory:", err);
            res.status(500).send("Error fetching inventory.");
            return;
        }

        if (inventory) {
            res.json(inventory.map(item => {
                return {
                    "name": item.item_name,
                    "icon": item.icon
                };
            }));
        } else {
            res.status(404).send("Inventory not found.");
        }
    });
});

router.get("/getLeaderboard", (req, res) => {
    Leaderboard.getInfiniteLeaderboard((err, leaderboard) => {
        if (err) {
            console.log("Error fetching leaderboard:", err);
            res.status(500).send("Error fetching leaderboard.");
            return;
        }

        if (leaderboard) {
            res.json(leaderboard);
        } else {
            res.status(404).send("Leaderboard not found.");
        }
    });
});

module.exports = router;

