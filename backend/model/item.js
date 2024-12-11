const db = require('../config/db');

/**
 * Class representing an item
 */
class Item {
    constructor(item) {
        this.id = item.id;
        this.nom = item.nom;
        this.fusionnable = item.fusionnable;
        this.image = item.image;
    }

    /**
     * Create a new item
     * @param newItem
     * @param result
     */
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

    /**
     * Find an item by its id
     * @param id
     * @param result
     */
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

    /**
     * Get all items
     * @param result
     */
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
