const db = require('../config/db');

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

    // Supprimer une fusion par ID
    static deleteById(id, result) {
        db.run(
            "DELETE FROM fusions WHERE id = ?", 
            [id], 
            function (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (this.changes === 0) {
                    // Pas de ligne supprimée
                    result({ kind: "not_found" }, null);
                } else {
                    console.log("Deleted fusion with id: ", id);
                    result(null, this.changes);
                }
            }
        );
    }

    // Fonction simulée pour vérifier si une fusion est possible
    static isFusionPossible(item1, item2, result) {
        console.log("Checking fusion possibility...");
    
        // Vérification si les deux items sont fusionnables
        db.get("SELECT fusionnable FROM items WHERE id = ?", [item1], (err, row1) => {
            if (err) {
                console.log("Error fetching item 1: ", err);
                result(err, null);
                return;
            }
    
            db.get("SELECT fusionnable FROM items WHERE id = ?", [item2], (err, row2) => {
                if (err) {
                    console.log("Error fetching item 2: ", err);
                    result(err, null);
                    return;
                }
    
                // Vérification de la possibilité de fusion
                if (row1 && row2 && row1.fusionnable === 1 && row2.fusionnable === 1) {
                    result(null, true);  // Fusion possible
                } else {
                    result(null, false); // Fusion non possible
                }
            });
        });
    }


    // Mettre à jour une fusion par ID
    static updateById(id, updatedFusion, result) {
        db.run(
            "UPDATE fusions SET item_id_1 = ?, item_id_2 = ?, item_fusionne_id = ? WHERE id = ?", 
            [updatedFusion.item_id_1, updatedFusion.item_id_2, updatedFusion.item_fusionne_id, id],
            function (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (this.changes === 0) {
                    // Pas de ligne mise à jour
                    result({ kind: "not_found" }, null);
                } else {
                    console.log("Updated fusion: ", { id: id, ...updatedFusion });
                    result(null, { id: id, ...updatedFusion });
                }
            }
        );
    }

    static getFusionItems(item1, item2, result) {
        console.log("Fetching items for fusion...");
    
        // Vérifier si les deux items sont fusionnables
        db.get("SELECT fusionnable FROM items WHERE id = ?", [item1], (err, row1) => {
            if (err) {
                console.log("Error fetching item 1: ", err);
                result(err, null);
                return;
            }
    
            db.get("SELECT fusionnable FROM items WHERE id = ?", [item2], (err, row2) => {
                if (err) {
                    console.log("Error fetching item 2: ", err);
                    result(err, null);
                    return;
                }
    
                // Vérifier si les deux items sont fusionnables
                if (row1 && row2 && row1.fusionnable === 1 && row2.fusionnable === 1) {
                    // Chercher si cette fusion existe déjà dans la table fusions
                    db.get("SELECT * FROM fusions WHERE item_id_1 = ? AND item_id_2 = ?", [item1, item2], (err, fusion) => {
                        if (err) {
                            console.log("Error fetching fusion: ", err);
                            result(err, null);
                            return;
                        }
    
                        // Si la fusion existe, retourner l'item fusionné
                        if (fusion) {
                            db.get("SELECT * FROM items WHERE id = ?", [fusion.item_fusionne_id], (err, fusionItem) => {
                                if (err) {
                                    console.log("Error fetching fused item: ", err);
                                    result(err, null);
                                    return;
                                }
    
                                // Retourner l'item fusionné
                                result(null, fusionItem);
                            });
                        } else {
                            result({ kind: "fusion_not_found" }, null);
                        }
                    });
                } else {
                    result({ kind: "fusion_not_possible" }, null);
                }
            });
        });
    }
    

    
}



module.exports = Fusion;
