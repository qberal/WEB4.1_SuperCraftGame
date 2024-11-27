const Infinity = require('../services/infinity');
const express = require("express");  // Assurez-vous que le chemin d'importation est correct
const router = express.Router();

router.get("/generate/:item1/:item2", (req, res) => {
    const item1 = req.params.item1;
    const item2 = req.params.item2;

    Infinity.getFusions(item1, item2, (err, fusions) => {
        if (err) {
            console.log("Error fetching fusions:", err);
            res.status(500).send("Error fetching fusions.");
            return;
        }

        if (fusions) {
            res.json(fusions);
        } else {
            res.status(404).send("Fusions not found.");
        }
    }).then((fusions) => {
        res.json(fusions);
    });
});

module.exports = router;

