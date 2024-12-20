const Infinity = require('../services/infinity');
const InfinityInventory = require('../model/infinityInventory');
const Leaderboard = require('../model/leaderboard');
const express = require("express");
const { isAuthenticated } = require('../services/auth');
const router = express.Router();

/**
 * Route to generate a fusion
 */
router.get("/generate", isAuthenticated, async (req, res) => {
    try {
        const user_id = req.session.user.id;
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
        const word = await Infinity.getWordOfTheDay();

        if (!fusions) {
            return res.status(404).send("Fusions not found.");
        }

        InfinityInventory.addItem(user_id, fusions.name, fusions.icon, result => {});

        if (word === fusions.name) {
            await Leaderboard.setInfinityScore(user_id, result => {});
        }

        res.json(fusions);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

/**
 * Route to get the word of the day
 */
router.get("/getWordOfTheDay", async (req, res) => {
    const word = await Infinity.getWordOfTheDay();
    res.json({"word": word});
});

/**
 * Route to get the inventory of the user
 */
router.get("/getInventory", isAuthenticated, (req, res) => {
    const user_id = req.session.user.id;

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

/**
 * Route to get the leaderboard
 */
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

/**
 * Route to get the score of the user
 */
router.get("/getScore", isAuthenticated, (req, res) => {
    const user_id = req.session.user.id;

    Leaderboard.getInfinityCurrentScore(user_id, (err, leaderboard) => {
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

