const db = require('../config/db');

class Leaderboard {
    /**
     * Classe qui gère le leaderboard
     * En mode infini, on va stocker les scores des utilisateurs pour chaque mot découvert (donc au max 1 score par jour et par mot)
     * c'est à dire le nombre de mots découverts d'une part, et le nombre de fusions nécessaires pour les découvrir d'autre part
     * plus le score est petit au niveau du nombre de fusions, mieux c'est
     * En mode normal, on va stocker les scores des utilisateurs pour chaque fusion réalisée, donc 1 seul score, et plus il est grand, mieux c'est
     */


    //mode infini: pour l'instant on compte le nombre de mots découverts par chaque utilisateur dans l'inventaire
    static getInfiniteLeaderboard(result) {
        db.all("SELECT username, COUNT(*) as count FROM infinity_inventory JOIN users ON users.id = infinity_inventory.user_id GROUP BY username ORDER BY COUNT DESC", function (err, scores) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, scores);
        });
    }

    static getInfinityScore(user_id, result) {
        db.get("SELECT COUNT(*) as score FROM infinity_inventory WHERE user_id = ?", [user_id], function (err, score) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, score);
        });
    }

    //mode normal: juste à compter l'inventaire normal de chaque utilisateur par count ascendant
    static getNormalLeaderboard(result) {

    }

}

module.exports = Leaderboard;