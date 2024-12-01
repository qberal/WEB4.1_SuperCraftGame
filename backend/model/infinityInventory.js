const db = require('../config/db');

class InfinityInventory {
    /**
     * Inventaire stocké en bdd pour les utilisateurs qui font le mode infini
     * En gros, l'inventaire est un table qui contient juste user_id et item_name et icon (pas de quantité)
     * On va stocker les items que l'utilisateur a découvert dans le mode infini
     */
    constructor(inventory) {
        this.user_id = inventory.user_id;
    }

    //vérifier si un item est déjà dans l'inventaire
    static checkItem(user_id, item_name) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM infinity_inventory WHERE (user_id = ? OR user_id = 0) AND item_name = ?", [user_id, item_name], function (err, item) {
                if (err) {
                    console.error("Error fetching item:", err);
                    reject(err);
                } else {
                    resolve(item);
                }
            });
        });
    }

    // Ajouter un item à l'inventaire
    static addItem(user_id, item_name, icon, result) {

        if (item_name === 'Error') {
            result({kind: "not_found"}, null);
            return;
        }

        db.run("INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (?, ?, ?)", [user_id, item_name, icon], function (err) {
            if (err) {
                console.log("error: ", err);
                return;
            }
            result(null, {user_id: user_id, item_name: item_name, icon: icon});
        });
    }

    // Trouver les items d'un utilisateur
    static findByUserId(user_id, result) {
        db.all("SELECT * FROM infinity_inventory WHERE user_id = ? OR user_id = 0", [user_id], function (err, inventory) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, inventory);
        });
    }

    static deleteAll(user_id, result) {
        db.run("DELETE FROM infinity_inventory WHERE user_id = ?", [user_id], function (err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log(`Deleted ${this.changes} items`);
            result(null, this.changes);
        });
    }

    static countInventory(user_id, result) {
        db.get("SELECT COUNT(*) as count FROM infinity_inventory WHERE user_id = ?", [user_id], function (err, count) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, count);
        });
    }

}

module.exports = InfinityInventory;