function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({error: 'Non autorisé. Veuillez vous connecter.'});
    }
}

module.exports = {isAuthenticated};
