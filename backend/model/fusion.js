const db = require('../config/db');
const Inventory = require('./inventory'); // Assurez-vous de bien importer votre modèle Inventory

class Fusion {
    constructor(fusion) {
        this.id = fusion.id;
        this.item_id_1 = fusion.item_id_1;
        this.item_id_2 = fusion.item_id_2;
        this.item_fusionne_id = fusion.item_fusionne_id;
    }

    // Créer une fusion 
    static create(newFusion, result) {
        db.run(
            "INSERT INTO fusions (item_id_1, item_id_2, item_fusionne_id) VALUES (?, ?, ?)", 
            [newFusion.item_id_1, newFusion.item_id_2, newFusion.item_fusionne_id],
            function (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("Created fusion: ", { id: this.lastID, ...newFusion });
                result(null, { id: this.lastID, ...newFusion });
            }
        );
    }

    // Trouver une fusion par ID
    static findById(id, result) {
        db.get(
            "SELECT * FROM fusions WHERE id = ?", 
            [id], 
            function (err, fusion) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (fusion) {
                    result(null, fusion);
                } else {
                    result({ kind: "not_found" }, null);
                }
            }
        );
    }

    // Lister toutes les fusions
    static getAll(result) {
        db.all(
            "SELECT * FROM fusions", 
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

    static getFusionItemId(userId, itemId1, itemId2, callback) {
        // Vérifier si les deux items sont présents dans l'inventaire de l'utilisateur
        Inventory.areItemsInInventory(userId, itemId1, itemId2, (areInInventory) => {
            if (!areInInventory) {
                // Si les items ne sont pas dans l'inventaire, retourner une erreur
                return callback("Les items ne sont pas tous dans l'inventaire.", null);
            }

            // Si les items sont dans l'inventaire, on cherche la fusion correspondante
            const query = `
                SELECT item_id
                FROM fusions
                WHERE (item_id_1 = ? AND item_id_2 = ?) OR (item_id_1 = ? AND item_id_2 = ?)
            `;

            db.get(query, [itemId1, itemId2, itemId2, itemId1], (err, fusion) => {
                if (err) {
                    console.log("Erreur lors de la recherche de la fusion :", err);
                    return callback("Erreur lors de la recherche de la fusion.", null);
                }

                if (fusion) {
                    // Retourner l'item fusionné trouvé
                    callback(null, fusion.item_id);
                } else {
                    // Si aucune fusion n'est trouvée, retourner une erreur
                    callback("Aucune fusion trouvée pour ces items.", null);
                }
            });
        });
    }

    static getFusionItemDetails(userId, itemId1, itemId2, callback) {
        // Vérifier si les deux items sont présents dans l'inventaire de l'utilisateur
        Inventory.areItemsInInventory(userId, itemId1, itemId2, (areInInventory) => {
            if (!areInInventory) {
                // Si les items ne sont pas dans l'inventaire, retourner une erreur
                return callback("Les items ne sont pas tous dans l'inventaire.", null);
            }
    
            // Si les items sont dans l'inventaire, on cherche la fusion correspondante
            const query = `
                SELECT item_id
                FROM fusions
                WHERE (item_id_1 = ? AND item_id_2 = ?) OR (item_id_1 = ? AND item_id_2 = ?)
            `;
    
            db.get(query, [itemId1, itemId2, itemId2, itemId1], (err, fusion) => {
                if (err) {
                    console.log("Erreur lors de la recherche de la fusion :", err);
                    return callback("Erreur lors de la recherche de la fusion.", null);
                }
    
                if (fusion) {
                    // Chercher l'item correspondant à l'ID de la fusion dans la table items
                    const itemQuery = `
                        SELECT * FROM items WHERE id = ?
                    `;
    
                    db.get(itemQuery, [fusion.item_id], (err, item) => {
                        if (err) {
                            console.log("Erreur lors de la recherche de l'item :", err);
                            return callback("Erreur lors de la recherche de l'item.", null);
                        }
    
                        if (item) {
                            // Vérifier si l'item fusionné est lui-même fusionnable
                            const fusionnableQuery = `
                                SELECT COUNT(*) AS count
                                FROM fusions
                                WHERE item_id_1 = ? OR item_id_2 = ?
                            `;
    
                            db.get(fusionnableQuery, [fusion.item_id, fusion.item_id], (err, result) => {
                                if (err) {
                                    console.log("Erreur lors de la vérification de fusion :", err);
                                    return callback("Erreur lors de la vérification de fusion.", null);
                                }
    
                                // Ajouter l'attribut fusionnable au résultat
                                const isFusionnable = result.count > 0;
                                callback(null, { ...item, fusionnable: isFusionnable });
                            });
                        } else {
                            callback("L'item fusionné n'a pas été trouvé dans la table des items.", null);
                        }
                    });
                } else {
                    // Si aucune fusion n'est trouvée, retourner une erreur
                    callback("Aucune fusion trouvée pour ces items.", null);
                }
            });
        });
    }
    
}





module.exports = Fusion;
