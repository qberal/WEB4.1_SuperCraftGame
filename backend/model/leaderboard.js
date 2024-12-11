const db = require('../config/db');
const Word = require('./word');

/**
 * Class representing the leaderboard
 */
class Leaderboard {

    /**
     * Get the infinite leaderboard
     * @param result
     * @returns {Promise<void>}
     */
    static async getInfiniteLeaderboard(result) {

        let wordId = await Word.getWordIdOfTheDay();

        db.all("SELECT username, score as count FROM infinity_leaderboard JOIN users ON users.id = infinity_leaderboard.user_id WHERE word_id = ? ORDER BY score ASC", [wordId], function (err, scores) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, scores);
        });
    }

    /**
     * Get the current score of the user for the infinite mode
     * @param user_id
     * @param result
     */
    static getInfinityCurrentScore(user_id, result) {
        db.get("SELECT COUNT(*) as score FROM infinity_inventory WHERE user_id = ?", [user_id], function (err, score) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, score);
        });
    }

    /**
     * Set the score of the user for the infinite mode
     * @param user_id
     * @param result
     * @returns {Promise<void>}
     */
    static async setInfinityScore(user_id, result) {

        this.getInfinityCurrentScore(user_id, async (err, score) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            let wordId = await Word.getWordIdOfTheDay();

            db.run("INSERT INTO infinity_leaderboard (word_id, user_id, score) VALUES (?, ?, ?)", [wordId, user_id, score.score], function (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, this.lastID);
            });
        })

    }

    /**
     * Get the normal leaderboard
     * @param result
     */
    static getNormalLeaderboard(result) {
        db.all("SELECT username, COUNT(*) + (SELECT COUNT(*) FROM inventory WHERE user_id = 0) as count FROM inventory JOIN users ON users.id = inventory.user_id  AND inventory.user_id != 0 GROUP BY username ORDER BY COUNT ASC", function (err, scores) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, scores);
        });
    }
}

module.exports = Leaderboard;