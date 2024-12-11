DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS fusions;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS infinity_inventory;


-- Table items
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    img TEXT NOT NULL
);

-- items
INSERT INTO items (id, nom, img) VALUES (1, 'Water', 'water.png');
INSERT INTO items (id, nom, img) VALUES (2, 'Fire', 'flame.png');
INSERT INTO items (id, nom, img) VALUES (3, 'Earth', 'dirt.png');
INSERT INTO items (id, nom, img) VALUES (4, 'Air', 'air.png');
INSERT INTO items (id, nom, img) VALUES (5, 'Stone', 'stone.png');
-- items de base -------


-- Fusion 6 : Water + Earth => Plant
INSERT OR IGNORE INTO items (id, nom, img) VALUES (6, 'Plant', 'plant.png');
-- Fusion 7 : Pierre + Feu => Lave
INSERT OR IGNORE INTO items (id, nom, img) VALUES (7, 'Lava', 'lava.png');--
-- Fusion 8 : Pierre + Eau => Sable
INSERT OR IGNORE INTO items (id, nom, img) VALUES (8, 'Sand', 'sand.png');
-- Fusion  9 : plante + Feu => Cendre
INSERT OR IGNORE INTO items (id, nom, img) VALUES (9, 'Ash', 'ashes.png');
-- Fusion 10 : Eau + Feu => Vapeur
INSERT OR IGNORE INTO items (id, nom, img) VALUES (10, 'Steam', 'steam.png'); --
-- Fusion 11 : Eau + Air => Brume
INSERT OR IGNORE INTO items (id, nom, img) VALUES (11, 'Mist', 'mist.png'); --

-- Fusion 12 : Feu + Terre => Volcan
INSERT OR IGNORE INTO items (id, nom, img) VALUES (12, 'Volcano', 'volcano.png');
-- Fusion 13 : Sable + Eau => Oasis
INSERT OR IGNORE INTO items (id, nom, img) VALUES (13, 'Oasis', 'oasis.png');
-- Fusion 14 : Feu + Sable => Verre
INSERT OR IGNORE INTO items (id, nom, img) VALUES (14, 'Glass', 'glass.png');



-- Fusion 15 : Vent + Feu => Fumée
INSERT OR IGNORE INTO items (id, nom, img) VALUES (15, 'Smoke', 'dark_smoke.png');
-- Fusion 16 : Fumée + Eau => Brouillard
INSERT OR IGNORE INTO items (id, nom, img) VALUES (16, 'Fog', 'fog.png');
-- Fusion 17 : Brouillard + Air => Nuage
INSERT OR IGNORE INTO items (id, nom, img) VALUES (17, 'Cloud', 'cloud.png');
-- Fusion 18 : Eau + Air => Vague
INSERT OR IGNORE INTO items (id, nom, img) VALUES (18, 'Wave', 'swave2.png'); -- attention img 

-- Fusion 19 : Plante + Eau => Arbre
INSERT OR IGNORE INTO items (id, nom, img) VALUES (19, 'Tree', 'tree.png');
-- Fusion 20 : Arbre + Feu => Charbon
INSERT OR IGNORE INTO items (id, nom, img) VALUES (20, 'Coal', 'coal.png');
-- Fusion 21 : Charbon + Feu => Chaleur
INSERT OR IGNORE INTO items (id, nom, img) VALUES (21, 'Heat', 'heat.png');

-- Fusion 22 : chaleur + eau => steam
INSERT OR IGNORE INTO items (id, nom, img) VALUES (22, 'Steam', 'steam.png');


-- Fusion 23 : earth + lava => volcano
INSERT OR IGNORE INTO items (id, nom, img) VALUES (23, 'Volcano', 'volcano.png');


----------------------------  PART 2 --------------------------------

-- Fusion 24 : stone + plant = axe 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (24, 'Axe', 'axe.png'); 
-- Fusion 25 : axe + tree = wood 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (25, 'Wood', 'log.png'); 
-- Fusion 26 : axe + wood = baguette 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (26, 'Baguette', 'baguette.png'); 
-- Fusion 27 : fire + wood = Campfire 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (27, 'Campfire', 'campfire.png'); 
-- Fusion 28 : earth + earth = plain 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (28, 'Plain', 'plain.png'); ---- new img
-- Fusion 29 : Wave + Wave = ocean  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (29, 'Ocean ', 'ocean.png'); ---- new img
-- Fusion 30 : plain + ocean  = Planet  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (30, 'Planet ', 'planet.png');
-- Fusion 31 : planet + planet   = Moon  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (31, 'Moon ', 'moon.png');
-- Fusion 32 : Volcano + Ocean   = Bacteria  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (32, 'Bacteria ', 'bacteria.png'); 
-- Fusion 32 : Volcano + Ocean   = Bacteria  
--INSERT OR IGNORE INTO items (id, nom, img) VALUES (32, 'Bacteria ', 'bacteria.png');
-- Fusion 33 : Bacteria + Planet   = Human  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (33, 'Human ', 'human.png'); 
-- Fusion 34 : Bacteria + Moon   = Alien  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (34, 'Alien ', 'alien.png'); 
-- Fusion 35 : Human + Human   = Village  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (35, 'Village ', 'village.png'); 
-- Fusion 36 : Bacteria + Air   = Bird  
INSERT OR IGNORE INTO items (id, nom, img) VALUES (36, 'Bird ', 'bird.png'); 
-- Fusion 37 : Planet + Moon   = Solar System 
INSERT OR IGNORE INTO items (id, nom, img) VALUES (37, 'Solar System', 'solar_system.png'); 

-- Fusion 38 : Fire + baguette   = Torch
INSERT OR IGNORE INTO items (id, nom, img) VALUES (38, 'Torch', 'torch.png'); 

-- Fusion 39 : Bird + Bird   = egg
INSERT OR IGNORE INTO items (id, nom, img) VALUES (39, 'Egg', 'egg.png');

-- Fusion 40 : water + Bacteria   = Fish
-- Fusion 41 : Wave + Bacteria   = Fish
-- Fusion 42 : Ocean + Bacteria   = Fish
INSERT OR IGNORE INTO items (id, nom, img) VALUES (41, 'Fish', 'fish.png');


/*
INSERT INTO items (id, nom, img) VALUES (39, 'Alien', 'alien.png');
INSERT INTO items (id, nom, img) VALUES (41, 'Axe', 'axe.png');
INSERT INTO items (id, nom, img) VALUES (42, 'Baguette', 'baguette.png');
INSERT INTO items (id, nom, img) VALUES (43, 'Barrel', 'barrel.png');
INSERT INTO items (id, nom, img) VALUES (44, 'Bed', 'bed.png');
INSERT INTO items (id, nom, img) VALUES (45, 'Bee', 'bee.png');
INSERT INTO items (id, nom, img) VALUES (46, 'Bird', 'bird.png');
INSERT INTO items (id, nom, img) VALUES (47, 'Book', 'book.png');
INSERT INTO items (id, nom, img) VALUES (48, 'Bread', 'bread.png');
INSERT INTO items (id, nom, img) VALUES (49, 'Butterfly', 'butterfly.png');
INSERT INTO items (id, nom, img) VALUES (50, 'Campfire', 'campfire.png');
INSERT INTO items (id, nom, img) VALUES (51, 'Candle', 'candle.png');
INSERT INTO items (id, nom, img) VALUES (52, 'Car', 'car.png');
INSERT INTO items (id, nom, img) VALUES (53, 'Chair', 'chair.png');
INSERT INTO items (id, nom, img) VALUES (54, 'Chalice', 'chalice.png');
INSERT INTO items (id, nom, img) VALUES (55, 'Chest', 'chest.png');
INSERT INTO items (id, nom, img) VALUES (56, 'Clay Pot', 'clay_pot.png');
INSERT INTO items (id, nom, img) VALUES (57, 'Clock', 'clock.png');
INSERT INTO items (id, nom, img) VALUES (59, 'Coffee', 'coffee.png');
INSERT INTO items (id, nom, img) VALUES (60, 'Controller', 'controller.png');
INSERT INTO items (id, nom, img) VALUES (61, 'Crate', 'crate.png');
INSERT INTO items (id, nom, img) VALUES (62, 'Crown', 'crown.png');
INSERT INTO items (id, nom, img) VALUES (63, 'Crystal', 'crystal.png');
INSERT INTO items (id, nom, img) VALUES (65, 'Diamond', 'diamond.png');
INSERT INTO items (id, nom, img) VALUES (66, 'Emerald', 'emerald.png');
INSERT INTO items (id, nom, img) VALUES (67, 'Energy', 'energy.png');
INSERT INTO items (id, nom, img) VALUES (68, 'Explosion', 'explosion.png');
INSERT INTO items (id, nom, img) VALUES (69, 'Feather', 'feather.png');
INSERT INTO items (id, nom, img) VALUES (70, 'Fish', 'fish.png');
INSERT INTO items (id, nom, img) VALUES (71, 'Flower', 'flower.png');
INSERT INTO items (id, nom, img) VALUES (72, 'Golden Key', 'gold_key.png');
INSERT INTO items (id, nom, img) VALUES (73, 'Golden Ring', 'gold_ring.png');
INSERT INTO items (id, nom, img) VALUES (74, 'Gold', 'gold.png');
INSERT INTO items (id, nom, img) VALUES (75, 'Grass', 'grass.png');
INSERT INTO items (id, nom, img) VALUES (76, 'Gun', 'gun.png');
INSERT INTO items (id, nom, img) VALUES (78, 'Horse', 'horse.png');
INSERT INTO items (id, nom, img) VALUES (79, 'Time', 'hourglass.png');
INSERT INTO items (id, nom, img) VALUES (80, 'Human', 'human.png');
INSERT INTO items (id, nom, img) VALUES (81, 'Key', 'key.png');
INSERT INTO items (id, nom, img) VALUES (82, 'Lantern', 'lantern.png');
INSERT INTO items (id, nom, img) VALUES (83, 'Leaf', 'leaf.png');
INSERT INTO items (id, nom, img) VALUES (84, 'Light Bulb', 'light_bulb.png');
INSERT INTO items (id, nom, img) VALUES (85, 'Wood', 'log.png');
INSERT INTO items (id, nom, img) VALUES (86, 'Magic Wand', 'magic_wand.png');
INSERT INTO items (id, nom, img) VALUES (87, 'Magma', 'magma_lake2.png');
INSERT INTO items (id, nom, img) VALUES (88, 'Mirror', 'mirror.png');
INSERT INTO items (id, nom, img) VALUES (89, 'Moon', 'moon.png');
INSERT INTO items (id, nom, img) VALUES (90, 'Music', 'music.png');
INSERT INTO items (id, nom, img) VALUES (91, 'Newspaper', 'newspapers.png');
INSERT INTO items (id, nom, img) VALUES (92, 'Moon', 'moon.png');
INSERT INTO items (id, nom, img) VALUES (93, 'Obsidian', 'obsidian.png');
INSERT INTO items (id, nom, img) VALUES (94, 'Paper', 'paper.png');
INSERT INTO items (id, nom, img) VALUES (95, 'Pen', 'pen.png');
INSERT INTO items (id, nom, img) VALUES (96, 'Plane', 'plane.png');
INSERT INTO items (id, nom, img) VALUES (97, 'Planet', 'planet.png');
INSERT INTO items (id, nom, img) VALUES (98, 'Potion', 'potion.png');
INSERT INTO items (id, nom, img) VALUES (99, 'Rainbow', 'rainbow.png');
INSERT INTO items (id, nom, img) VALUES (100, 'Reeds', 'reeds.png');
INSERT INTO items (id, nom, img) VALUES (101, 'Robot', 'robot.png');
INSERT INTO items (id, nom, img) VALUES (102, 'Rose', 'rose.png');
INSERT INTO items (id, nom, img) VALUES (103, 'Rune', 'rune.png');
INSERT INTO items (id, nom, img) VALUES (105, 'Shield', 'shield.png');
INSERT INTO items (id, nom, img) VALUES (106, 'Soap', 'soap.png');
INSERT INTO items (id, nom, img) VALUES (107, 'Solar System', 'solar_system.png');
INSERT INTO items (id, nom, img) VALUES (108, 'Soup', 'soup.png');
INSERT INTO items (id, nom, img) VALUES (109, 'Stone', 'stone.png');
INSERT INTO items (id, nom, img) VALUES (110, 'Swamp', 'swamp.png');
INSERT INTO items (id, nom, img) VALUES (112, 'Table', 'table.png');
INSERT INTO items (id, nom, img) VALUES (113, 'Telescope', 'telescope.png');
INSERT INTO items (id, nom, img) VALUES (114, 'Thermometer', 'thermometer.png');
INSERT INTO items (id, nom, img) VALUES (115, 'Thunder', 'thundercloud.png');
INSERT INTO items (id, nom, img) VALUES (116, 'Torch', 'torch.png');
INSERT INTO items (id, nom, img) VALUES (117, 'Tornado', 'tornado.png');
INSERT INTO items (id, nom, img) VALUES (118, 'Trash', 'trash.png');
INSERT INTO items (id, nom, img) VALUES (120, 'Truck', 'truck2.png');
INSERT INTO items (id, nom, img) VALUES (121, 'Village', 'village.png');
INSERT INTO items (id, nom, img) VALUES (123, 'Egg', 'egg.png');
INSERT INTO items (id, nom, img) VALUES (124, 'Duck', 'duck.png');
INSERT INTO items (id, nom, img) VALUES (125, 'Bacteria', 'bacteria.png');
INSERT INTO items (id, nom, img) VALUES (126, 'Copper coil', 'coil.png');
INSERT INTO items (id, nom, img) VALUES (127, 'Wheel', 'wheel.png');
INSERT INTO items (id, nom, img) VALUES (128, 'Electricity', 'electricity.png');
INSERT INTO items (id, nom, img) VALUES (129, 'Oven', 'oven.png');
INSERT INTO items (id, nom, img) VALUES (130, 'Boat', 'boat.png');
 */


-- Table fusions
CREATE TABLE IF NOT EXISTS fusions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id_1 INTEGER,
    item_id_2 INTEGER,
    item_id INTEGER,
    FOREIGN KEY(item_id_1) REFERENCES items(id),
    FOREIGN KEY(item_id_2) REFERENCES items(id),
    FOREIGN KEY(item_id) REFERENCES items(id)
);

INSERT INTO fusions (item_id_1, item_id_2, item_id) VALUES

    (1,3,6), -- water + dirt => plant id 6
    (5, 2, 7),         -- Pierre + Feu => Lave id 7
    (5, 1, 8),         -- Pierre + Eau => Sable id 8
    (6, 2, 9),         -- plante + Feu => Cendre id 9
    (1, 2, 10),        -- Eau + Feu => Vapeur id 10
    (1, 4, 11),        -- Eau + Air => Brume id 11
    (2, 3, 12),        -- Feu + Terre => Volcan id 12
    (8,1, 13),        -- Sable + Eau => Oasis id 13
    (2,8,14),          -- feu + sable => Verre id 14
    (4,2,15),        -- air + fire => fumee id 15
    (15,1,16),  -- fumee + water => brouillard id 16
    (16,4,17),  -- brouillard + air => nuage id 17
    (1,4,18), -- eau + air => vague id 18
    (6,1,19),  -- plante + eau => arbre id 19
    (19,2,20),  -- arbre +feu => charbon id 20
    (20,2,21),  -- charbon +feu => chaleur id 21
    (21,1,22),  -- chaleur +eau => vapeur id 22
    (3,7,23),  -- terre +lave => volcan id 23


    (5,6,24), -- plant + stone = axe id 24
    (19,24,25), -- axe + tree = wood id 25







--Table inventory
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID unique pour chaque entrée
    user_id INTEGER NOT NULL,             -- ID de l'utilisateur
    item_id INTEGER NOT NULL,             -- ID de l'item
    FOREIGN KEY(item_id) REFERENCES items(id), -- Clé étrangère liée à la table items
    CONSTRAINT unique_user_item UNIQUE (user_id, item_id) -- Contrainte d'unicité
);

--Items par défaut pour tout utilisateur
INSERT INTO inventory (id, user_id, item_id) VALUES (1, 0, 1);
INSERT INTO inventory (id, user_id, item_id) VALUES (2, 0, 2);
INSERT INTO inventory (id, user_id, item_id) VALUES (3, 0, 3);
INSERT INTO inventory (id, user_id, item_id) VALUES (4, 0, 4);


create table infinity_inventory
(
    user_id   integer
        constraint infinity_inventory_users_id_fk
            references users,
    item_name TEXT,
    icon      TEXT,
    constraint infinity_inventory_pk
        primary key (user_id, item_name)
);


INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Fire', '🔥');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Earth', '🌍');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Air', '💨');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Life', '🧬');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Metal', '🪙');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Time', '⌛');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Water', '💧');
INSERT INTO infinity_inventory (user_id, item_name, icon) VALUES (0, 'Wood', '🪵');