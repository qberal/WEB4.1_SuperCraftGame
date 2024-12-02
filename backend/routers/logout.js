const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion." });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Déconnexion réussie." });
    });
});

module.exports = router;