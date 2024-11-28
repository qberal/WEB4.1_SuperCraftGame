const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import du modèle utilisateur

router.use(express.urlencoded({ extended: true }));

router.post('/login', function (req, res) {
    const { username, password } = req.body;

    // Vérification des champs
    if (!username || !password) {
        return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis." });
    } //TODO : À afficher dans le front

    try {
        User.findByUsername(username, async (err, user) => {

            // Vérifier si le username existe
            if (!user) {
                return res.status(404).json({ message: "Nom d'utilisateur introuvable." });
            } //TODO : À afficher dans le front

            // Vérifier que le mot de passe correspond
            const isPasswordValid = await User.checkPassword(user, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mot de passe incorrect." });
            } //TODO : À afficher dans le front

            //Redirection
            console.log("Conexion réussie !");
            return res.status(200).json({ message: "Connexion réussie !" });
            // TODO : Rediriger vers un /play correspondant à la session de l'utilisateur
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// TODO : Faire un token jwt pour la connexion

module.exports = router;