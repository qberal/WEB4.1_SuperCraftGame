const express = require('express');
const router = express.Router();
const User = require('../model/user');


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Route to register
 */
router.post('/register', async (req, res) => {
    const { username, email, password, passwordConfirm} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "L'adresse email n'est pas valide." });
    }

    if (password !== passwordConfirm) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    try {
        User.findByUsername(username, async (err, existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris !" });
            }
            User.findByEmail(email, async (err, existingEmail) => {
                if (existingEmail) {
                    return res.status(400).json({ message: "Cet email est déjà utilisé !" });
                }
                const newUser = {
                    username,
                    email,
                    password,
                    role: 'user',
                };
                User.create(newUser, (err, createdUser) => {
                    if (err) {
                        return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
                    }
                    res.status(201).json({ message : "Votre compte est créé ! Connectez-vous.", user: createdUser, redirectUrl: "/login" });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
});

module.exports = router;