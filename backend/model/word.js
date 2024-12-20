const db = require('../config/db');
const InfinityInventory = require("./infinityInventory");

/**
 * Class representing a word
 */
class Word {
    /**
     * Get the word of the day
     * @returns {Promise<unknown>}
     */
    static async getWordOfTheDay() {
        return new Promise((resolve, reject) => {
            const today = new Date().toISOString().split('T')[0];

            db.get("SELECT w.word FROM current_word cw JOIN words w ON cw.word_id = w.id WHERE cw.date = ?", [today], (err, row) => {
                    if (err) return reject(err);

                    if (row) {
                        return resolve(row.word);
                    } else {
                        db.get("SELECT id, word FROM words ORDER BY RANDOM() LIMIT 1", (err, randomWord) => {
                                if (err) return reject(err);
                                if (!randomWord) return reject("Pas de mot trouvé dans la base de données");

                                db.run("INSERT INTO current_word (word_id, date) VALUES (?, ?)", [randomWord.id, today], (err) => {
                                        if (err) return reject(err);
                                        InfinityInventory.resetInfiniteInventory((err) => {
                                            if (err) console.error("Error resetting leaderboard:", err);
                                        });
                                        return resolve(randomWord.word);
                                    }
                                );
                            }
                        );
                    }
                }
            );
        });
    }

    /**
     * Get the word id of the day
     * @returns {Promise<unknown>}
     */
    static async getWordIdOfTheDay() {
        return new Promise((resolve, reject) => {
            const today = new Date().toISOString().split('T')[0];

            db.get("SELECT cw.id FROM current_word cw JOIN words w ON cw.word_id = w.id WHERE cw.date = ?", [today], (err, row) => {
                    if (err) return reject(err);

                    if (row) {
                        return resolve(row.id);
                    } else {
                        db.get("SELECT id, word FROM words ORDER BY RANDOM() LIMIT 1", (err, randomWord) => {
                                if (err) return reject(err);
                                if (!randomWord) return reject("Pas de mot trouvé dans la base de données");

                                db.run("INSERT INTO current_word (word_id, date) VALUES (?, ?)", [randomWord.id, today], (err) => {
                                        if (err) return reject(err);
                                        InfinityInventory.resetInfiniteInventory((err) => {
                                            if (err) console.error("Error resetting leaderboard:", err);
                                        });
                                        return resolve(randomWord.id);
                                    }
                                );
                            }
                        );
                    }
                }
            );
        });
    }
}

module.exports = Word;