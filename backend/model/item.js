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

    // Trouver un item par nom
    static findByNom(nom, result) {
        db.get("SELECT * FROM items WHERE nom = ?", [nom], function (err, item) {
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

    // Trouver les items si ils sont fusionnables
    static findByFusionnable(fusionnable, result) {
        db.all("SELECT * FROM items WHERE fusionnable = ?", [fusionnable], function (err, items) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (items.length > 0) {
                result(null, items);
                return;
            }
            result({kind: "not_found"}, null);
        });
    }
}

module.exports = Item;
