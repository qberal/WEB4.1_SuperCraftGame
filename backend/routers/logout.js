const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la destruction de la session :", err);
            return res.status(500).json({ message: "Erreur lors de la déconnexion." });
        }
        res.clearCookie('connect.sid');
        console.log("Utilisateur déconnecté avec succès.");
        return res.status(200).json({ message: "Déconnexion réussie." });
    });
});

module.exports = router;