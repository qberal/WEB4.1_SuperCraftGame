const db = require('../config/db');

/**
 * Class representing an inventory for infinite mode
 */
class InfinityInventory {
    constructor(inventory) {
        this.user_id = inventory.user_id;
    }

    /**
     * Check if an item is in the infinite inventory
     * @param user_id
     * @param item_name
     * @returns {Promise<unknown>}
     */
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

    /**
     * Add an item to the infinite inventory
     * @param user_id
     * @param item_name
     * @param icon
     * @param result
     */
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

    /**
     * Find inventory by user
     * @param user_id
     * @param result
     */
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

    /**
     * Delete inventory by user
     * @param user_id
     * @param result
     */
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

    /**
     * Count the number of items in the inventory
     * @param user_id
     * @param result
     */
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

    /**
     * Reset the infinite inventory for all users
     * @param result
     */
    static resetInfiniteInventory(result) {
        db.run("DELETE FROM infinity_inventory WHERE user_id != 0", (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Inventory reset.");
            result(null, { message: "Inventory reset successfully." });
        });
    }

}

module.exports = InfinityInventory;