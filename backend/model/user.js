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
    static create(newUser, result) {

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
    static checkPassword(user, password) {
        return bcrypt.compare(password, user.password);
    }

}

module.exports = User;
