const db = require('../config/db');

class Inventory {
    constructor(inventory) {
        this.user_id = inventory.user_id;
    }

    static getUserInventory(userId) {
        const query = `
            SELECT items.id AS item_id, items.nom AS item_name, items.img AS item_image
            FROM inventory
            INNER JOIN items ON inventory.item_id = items.id
            WHERE inventory.user_id = ? OR inventory.user_id = 0;
        `;

        return new Promise((resolve, reject) => {
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Erreur lors de la récupération de l\'inventaire :', err);
                    reject(new Error('Erreur lors de la récupération de l\'inventaire.'));
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getAllItems() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id, nom, img
                FROM items;
            `;

            db.all(query, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de la récupération des items :', err);
                    reject(new Error('Erreur lors de la récupération des items.'));
                } else {
                    resolve(rows);
                }
            });
        });
    }


    static addItemToInventory(userId, itemId) {
        return new Promise((resolve, reject) => {
            // Vérifier si l'item est déjà dans l'inventaire de l'utilisateur
            const checkQuery = `
                SELECT 1 FROM inventory WHERE user_id = ? AND item_id = ?
            `;
            db.get(checkQuery, [userId, itemId], (err, row) => {
                if (err) {
                    console.error('Erreur lors de la vérification de l\'item dans l\'inventaire :', err);
                    return reject(new Error('Erreur lors de la vérification de l\'item dans l\'inventaire.'));
                }
    
                if (row) {
                    // Si l'item existe déjà dans l'inventaire, ne pas l'ajouter
                    console.log(`L'item ${itemId} est déjà dans l'inventaire de l'utilisateur ${userId}.`);
                    return resolve({ message: 'L\'item est déjà dans l\'inventaire.' });
                }
    
                // Si l'item n'est pas dans l'inventaire, l'ajouter
                const query = `
                    INSERT INTO inventory (user_id, item_id)
                    VALUES (?, ?);
                `;
    
                db.run(query, [userId, itemId], function(err) {
                    if (err) {
                        console.error('Erreur lors de l\'ajout de l\'item à l\'inventaire :', err);
                        return reject(new Error('Erreur lors de l\'ajout de l\'item à l\'inventaire.'));
                    } else {
                        resolve({ id: this.lastID });
                    }
                });
            });
        });
    }
    

    static countInventory(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) AS item_count
                FROM inventory
                WHERE user_id = ? AND user_id = 0;
            `;

            db.get(query, [userId], (err, row) => {
                if (err) {
                    console.error('Erreur lors du comptage des items dans l\'inventaire :', err);
                    reject(new Error('Erreur lors du comptage des items dans l\'inventaire.'));
                } else {
                    resolve(row.item_count); // On retourne le nombre d'items
                }
            });
        });
    }


    static isItemInInventory(userId, itemId, callback) {
        const query = `
            SELECT 1
            FROM inventory
            WHERE user_id = ? OR user_id = 0 AND item_id = ?
            LIMIT 1;
        `;
    
        db.get(query, [userId, itemId], (err, row) => {
            if (err) {
                console.error('Erreur lors de la vérification de l\'item dans l\'inventaire :', err);
                return callback(false); // En cas d'erreur, on retourne false
            }
            callback(row ? true : false); // Si l'item est trouvé, callback avec true
        });
    }

    static areItemsInInventory(userId, itemId1, itemId2, callback) {
        const query = `
            SELECT 1
            FROM inventory
            WHERE user_id = ? OR user_id = 0 AND item_id IN (?, ?)
            LIMIT 2;
        `;
    
        db.all(query, [userId, itemId1, itemId2], (err, rows) => {
            if (err) {
                console.error('Erreur lors de la vérification des items dans l\'inventaire :', err);
                return callback(false); // Retourne false en cas d'erreur
            }
            callback(rows.length === 2); // Retourne true si 2 items sont trouvés, sinon false
        });
    }
    

    
    
    
}

module.exports = Inventory;
