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
    ('Magma', 'magma.png'),         -- id = 7
    ('Sable', 'sable.png'),         -- id = 8
    ('Marécage', 'marecage.png'),   -- id = 9
    ('Cendre', 'cendre.png'),       -- id = 10
    ('Vent', 'vent.png'),           -- id = 11
    ('Vapeur', 'vapeur.png'),       -- id = 12
    ('Brume', 'brume.png'),         -- id = 13
    ('Tempête', 'tempete.png'),     -- id = 14
    ('Boueuse', 'boueuse.png'),     -- id = 15
    ('Lave', 'lave.png'),           -- id = 16
    ('Solstice', 'solstice.png'),   -- id = 17
    ('Limoneuse', 'limoneuse.png'), -- id = 18
    ('Volcanique', 'volcanique.png'), -- id = 19
    ('Tornade', 'tornade.png'),     -- id = 20
    ('Volcanique II', 'volcanique_2.png'), -- id = 21
    ('Fumée', 'fumee.png'),         -- id = 22
    ('Oasis', 'oasis.png'),         -- id = 23
    ('Température', 'temperature.png'), -- id = 24
    ('Obsidienne', 'obsidienne.png'), -- id = 25
    ('Marécageuse', 'marecageuse.png'), -- id = 26
    ('Tornado de Cendres', 'tornado_cendres.png'), -- id = 27
    ('Dune', 'dune.png'),           -- id = 28
    ('Feu et Vent', 'feu_vent.png'), -- id = 29
    ('Fumée Volcanique', 'fumee_volcanique.png'), -- id = 30
    ('Cyclone', 'cyclone.png'),     -- id = 31
    ('Incendie', 'incendie.png'),   -- id = 32
    ('Explosion', 'explosion.png'), -- id = 33
    ('Cristal', 'cristal.png');     -- id = 34

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
    (1, 4, 7),         -- Pierre + Feu => Magma
    (1, 5, 8),         -- Pierre + Air => Sable
    (2, 3, 9),        -- Feuille + Eau => Marécage
    (2, 4, 10),        -- Feuille + Feu => Cendre
    (2, 5, 11),        -- Feuille + Air => Vent
    (3, 4, 12),        -- Eau + Feu => Vapeur
    (3, 5, 13),        -- Eau + Air => Brume
    (4, 5, 14),        -- Feu + Air => Tempête
    (1, 6, 15),        -- Terre + Eau => Boueuse
    (1, 7, 16),        -- Terre + Feu => Lave
    (1, 8, 17),        -- Terre + Air => Solstice
    (2, 6, 18),        -- Eau + Terre => Limoneuse
    (2, 7, 29),        -- Feu + Terre => Volcanique
    (2, 8, 20),        -- Air + Terre => Tornade
    (9, 10, 21),       -- Magma + Cendre => Volcanique II
    (9, 11, 22),       -- Marécage + Cendre => Fumée
    (10, 11, 23),      -- Sable + Eau => Oasis
    (11, 12, 24),      -- Vapeur + Vent => Température
    (13, 14, 25),      -- Boue + Lave => Obsidienne
    (13, 15, 26),      -- Boue + Brume => Marécageuse
    (14, 16, 27),      -- Cendre + Tempête => Tornado de Cendres
    (17, 18, 28),      -- Solstice + Sable => Dune
    (18, 19, 29),      -- Lave + Tempête => Feu et Vent
    (19, 20, 30),      -- Volcanique II + Brume => Fumée Volcanique
    (20, 21, 31),      -- Brume + Tornade => Cyclone
    (21, 22, 32),      -- Lave + Tornade => Incendie
    (22, 23, 33),      -- Tempête + Lave => Explosion
    (24, 25, 34);      -- Obsidienne + Oasis => Crista


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

-- Créer la table words (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL UNIQUE
);

-- Créer la table current_word (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS current_word (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(word_id) REFERENCES words(id)
);