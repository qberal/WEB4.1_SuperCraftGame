const db = require('../config/db');
const bcrypt = require('bcrypt');

//model for user
class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
    }

    //create user
    /*static create(newUser, result) {

        //hash password
        newUser.password = bcrypt.hash(newUser.password, 10);

        db.run("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)", [newUser.username, newUser.password, newUser.email, newUser.role], function (err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created user: ", {id: this.lastID, ...newUser});
            result(null, {id: this.lastID, ...newUser});
        });
    }*/

    static async create(newUser, result) {
        try {
            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword;

            // Insérer l'utilisateur dans la base de données
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
    

    //find user by id
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
            // not found user with the id
            result({kind: "not_found"}, null);
        });
    }

    //find user by username
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

    //find user by email
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

    //check password
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
