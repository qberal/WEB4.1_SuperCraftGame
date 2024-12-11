/**
 * Middleware pour vérifier si l'utilisateur est connecté
 * @param req
 * @param res
 * @param next
 */
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({error: 'Non autorisé. Veuillez vous connecter.'});
    }
}

module.exports = {isAuthenticated};
