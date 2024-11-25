const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import du modèle utilisateur

router.use(express.urlencoded({ extended: true }));

// Route pour se connecter
router.post('/login', function (req, res) {
    const { username, password } = req.body;

    // Vérification des champs
    if (!username || !password) {
        return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis." });
    }

    try {
        // Vérifier si le username existe
        User.findByUsername(username, async (err, user) => {
            if (!user) {
                return res.status(404).json({ message: "Nom d'utilisateur introuvable." });
            }

            // Vérifier que le mot de passe correspond
            if (user.password !== password) {
                return res.status(401).json({ message: "Mot de passe incorrect." });
            }

            // Redirection vers /play
            //return res.status(200).json({ message: "Connexion réussie.", redirect: "/play" });
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// TODO : Faire un token jwt pour la connexion
module.exports = router;