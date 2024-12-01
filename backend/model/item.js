const db = require('../config/db');

class Item {
    constructor(item) {
        this.id = item.id;
        this.nom = item.nom;
        this.fusionnable = item.fusionnable;
        this.image = item.image;
    }

    // Créer un item
    static create(newItem, result) {
        // Pas de boolean dans SQLITE, seulement 0 ou 1
        newItem.fusionnable = newItem.fusionnable ? 1 : 0; 
        db.run("INSERT INTO items (nom, fusionnable, image) VALUES (?, ?, ?)", [newItem.nom, newItem.fusionnable, newItem.image], function (err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created item: ", {id: this.lastID, ...newItem});
            result(null, {id: this.lastID, ...newItem});
        });
    }

    // Trouver un item par ID
    static findById(id, result) {
        db.get("SELECT * FROM items WHERE id = ?", [id], function (err, item) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (item) {
                result(null, item);
                return;
            }
            result({kind: "not_found"}, null);
        });
    }

    static getAll(result) {
        db.all(
            "SELECT * FROM items", 
            [], 
            function (err, fusions) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, fusions);
            }
        );
    }
}

module.exports = Item;
