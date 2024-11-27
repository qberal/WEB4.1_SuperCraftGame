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
}

module.exports = Fusion;
