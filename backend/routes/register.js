const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Validation email avec regex
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Route pour s'enregistrer
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body;

    // Vérification des champs
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    /*if (!validateEmail(email)) {
        return res.status(400).json({ message: "L'adresse email n'est pas valide." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }*/ // TODO : Gérer dans le front

    try {
        // Vérifier si le username existe
        User.findByUsername(username, async (err, existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris." });
            }

            // Vérifier si l'email existe
            User.findByEmail(email, async (err, existingEmail) => {
                if (existingEmail) {
                    return res.status(400).json({ message: "Cet email est déjà utilisé." });
                }

                // Création d'un nouvel utilisateur
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
                    res.status(201).json({ message: "Votre compte est créé !", user: createdUser });
                });
            });
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

module.exports = router;