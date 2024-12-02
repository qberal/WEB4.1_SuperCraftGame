const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.use(express.urlencoded({ extended: true }));

router.post('/login', function (req, res) {
    const { username, password } = req.body;

    // Vérification des champs
    if (!username || !password) {
        return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis." });
    }

    try {
        User.findByUsername(username, async (err, user) => {

            // Vérifier si le username existe
            if (!user) {
                return res.status(404).json({ message: "Nom d'utilisateur introuvable." });
            }

            // Vérifier que le mot de passe est correct
            const isPasswordValid = await User.checkPassword(user, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mot de passe incorrect." });
            }

            req.session.user = { id: user.id, username: user.username, role: user.role };
            return res.status(200).json({ message: "Connexion réussie !" });
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
});

/*router.get('/protected', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
    }

    res.json({ message: `Bienvenue, ${req.session.user.username}!` });
});*/

router.get('/getUsername', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Non autorisé" });
    }
    res.json({ username: req.session.user.username });
});

router.get('/getSession', (req, res) => {
    res.json({ authenticated: (req.session && req.session.user) });
});

module.exports = router;