-- Supprimer les anciennes tables si elles existent
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS fusions;
DROP TABLE IF EXISTS inventory;



-- Créer la table items (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    img TEXT NOT NULL
);

-- Insérer tous les items nécessaires dans l'ordre correct pour les fusions
INSERT INTO items (nom, img) VALUES
    ('Pierre', 'pierre.png'),       -- id = 1
    ('Feuille', 'feuille.png'),     -- id = 2
    ('Eau','eau.png'),             -- id = 3
    ('Feu', 'feu.png'),             -- id = 4
    ('Air', 'air.png'),             -- id = 5
    ('Terre','terre.png'),         -- id = 6
    ('Lave', 'lave.png'),         -- id = 7

    ('Sable', 'sable.png'),         -- id = 8
    ('Cendre', 'cendre.png'),       -- id = 9

    ('Vapeur', 'vapeur.png'),       -- id = 10
    ('Brume', 'brume.png'),         -- id = 11

    ('Boue', 'boue.png'),           -- id = 12
    ('Volcan', 'volcan.png'),     -- id = 13

    ('Oasis', 'oasis.png'),         -- id = 14
    ('Verre','verre.png'),          -- id = 15

    ('Plante','plante.png'), -- id = 16
    ('Fumee','Fumee.png'),  -- id = 17

    ('Brouillard','brouillard.png'),  -- id = 18
    ('Nuage','nuage.png'),  -- id = 19

    ('Vague','vague.png'),  -- id = 20
    ('Marais','marais.png'),  -- id = 21

    ('Arbre','arbre.png'),  -- id = 22
    ('Charbon','charbon.png'),  -- id = 23

    ('Chaleur','chaleur.png');  -- id = 24



-- Créer la table fusions (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS fusions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id_1 INTEGER,
    item_id_2 INTEGER,
    item_id INTEGER,
    FOREIGN KEY(item_id_1) REFERENCES items(id),
    FOREIGN KEY(item_id_2) REFERENCES items(id),
    FOREIGN KEY(item_id) REFERENCES items(id)
);

-- Insérer les fusions avec les nouveaux id cohérents
INSERT INTO fusions (item_id_1, item_id_2, item_id) VALUES
    (1, 2, 6),         -- Pierre + Feuille => Terre
    (1, 4, 7),         -- Pierre + Feu => Lave

    (1, 3, 8),         -- Pierre + Eau => Sable
    (2, 4, 9),         -- Feuille + Feu => Cendre

    (3, 4, 10),        -- Eau + Feu => Vapeur
    (3, 5, 11),        -- Eau + Air => Brume

    (6, 3, 12),        -- Terre + Eau => Boue
    (4, 6, 13),        -- Feu + Terre => Volcan

    (8, 3, 14),        -- Sable + Eau => Oasis
    (4,8,15),          -- feu + sable => Verre

    (2,3,16),          -- feuille + eau => plante
    (4,5,17),        -- vent + feu => fumee

    (17,3,18),  -- fumee + eau => brouillard
    (18,5,19),  -- brouillard + air => nuage

    (3,5,20), -- eau + air => vague
    (3,16,21), -- plante + eau => marais

    (16,3,22),  -- plante + eau => arbre
    (22,4,23),  -- arbre +feu => charbon

    (23,4,24),  -- charbon +feu => chaleur
    (24,3,10),  -- chaleur +eau => vapeur

    (6,7,13);  -- terre +lave => volcan








-- Créer la table inventory
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID unique pour chaque entrée
    user_id INTEGER NOT NULL,             -- ID de l'utilisateur
    item_id INTEGER NOT NULL,             -- ID de l'item
    FOREIGN KEY(item_id) REFERENCES items(id), -- Clé étrangère liée à la table items
    CONSTRAINT unique_user_item UNIQUE (user_id, item_id) -- Contrainte d'unicité
);
-- Exemple d'insertion dans la table inventory
INSERT INTO inventory (user_id, item_id) VALUES
    (1, 1), -- L'utilisateur 1 possède l'item avec id 1 (Pierre)
    (1, 2), -- L'utilisateur 1 possède l'item avec id 2 (Feuille)
    (1, 3), -- L'utilisateur 2 possède l'item avec id 3 (Eau)
    (1, 4), -- L'utilisateur 2 possède l'item avec id 3 (Eau)
    (1, 5); -- L'utilisateur 2 possède l'item avec id 3 (Eau)
