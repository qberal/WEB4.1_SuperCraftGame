const db = require('../config/db');
const bcrypt = require('bcrypt');

/**
 * Class representing a user
 */
class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
    }

    /**
     * Create a new user
     * @param newUser
     * @param result
     * @returns {Promise<void>}
     */
    static async create(newUser, result) {
        try {
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword;
            db.run(
                "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
                [newUser.username, newUser.password, newUser.email, newUser.role],
                function (err) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("Created user: ", { id: this.lastID, ...newUser });
                    result(null, { id: this.lastID, ...newUser });
                }
            );
        } catch (error) {
            console.log("Erreur lors du hachage du mot de passe :", error);
            result(error, null);
        }
    }


    /**
     * Find a user by its id
     * @param id
     * @param result
     */
    static findById(id, result) {
        db.get("SELECT * FROM users WHERE id = ?", [id], function (err, user) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (user) {
                result(null, user);
                return;
            }
            result({kind: "not_found"}, null);
        });
    }

    /**
     * Find a user by its username
     * @param username
     * @param result
     */
    static findByUsername(username, result) {
        db.get("SELECT * FROM users WHERE username = ?", [username], function (err, user) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (user) {
                result(null, user);
                return;
            }
            // not found user with the username
            result({kind: "not_found"}, null);
        });
    }

    /**
     * Find a user by its email
     * @param email
     * @param result
     */
    static findByEmail(email, result) {
        db.get("SELECT * FROM users WHERE email = ?", [email], function (err, user) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (user) {
                    result(null, user);
                    return;
                }
                // not found user with the email
                result({kind: "not_found"}, null);
            }
        );
    }

    /**
     * Check if the password is correct
     * @param user
     * @param password
     * @returns {Promise<void|*>}
     */
    static async checkPassword(user, password) {
        try {
            const isValid = await bcrypt.compare(password, user.password);
            return isValid;
        } catch (error) {
            console.error("Erreur lors de la comparaison des mots de passe :", error);
            throw error;
        }
    }
}

module.exports = User;
