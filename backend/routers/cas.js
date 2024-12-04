const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.use(express.urlencoded({ extended: true }));

router.get('/cas-callback', function (req, res) {
    // TODO: Production servers should make sure they override these headers

    console.log("test");

    let email = req.headers['x-insa-auth-email'];
    let username = req.headers['x-insa-auth-uid'];

    // Vérification des champs
    if (!email || !username) {
        return res.status(400).json({ message: "Nom d'utilisateur et email requis." });
    }

    try {
        User.findByUsername(username, async (err, user) => {
            // Vérifier si le username existe
            if (!user) {
                try {
                    const newUser = {
                        username,
                        email,
                        password: "",
                        role: 'user',
                    };
                    User.create(newUser, (err, createdUser) => {
                        if (err) {
                            return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
                        }
                        req.session.user = { id: createdUser.id, username: createdUser.username, role: createdUser.role };
                        return res.redirect('/normal');
                    });
                } catch (error) {
                    res.status(500).json({ message: "Erreur serveur lors de la création du compte." });
                }
            } else {
                req.session.user = { id: user.id, username: user.username, role: user.role };
                return res.redirect('/normal');
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la connexion." });
    }
});

module.exports = router;