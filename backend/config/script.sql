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
INSERT INTO items (id, nom, img) VALUES (39, 'Alien', 'alien.png');
INSERT INTO items (id, nom, img) VALUES (40, 'Ash', 'ashes.png');
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
INSERT INTO items (id, nom, img) VALUES (58, 'Cloud', 'cloud.png');
INSERT INTO items (id, nom, img) VALUES (59, 'Coffee', 'coffee.png');
INSERT INTO items (id, nom, img) VALUES (60, 'Controller', 'controller.png');
INSERT INTO items (id, nom, img) VALUES (61, 'Crate', 'crate.png');
INSERT INTO items (id, nom, img) VALUES (62, 'Crown', 'crown.png');
INSERT INTO items (id, nom, img) VALUES (63, 'Crystal', 'crystal.png');
INSERT INTO items (id, nom, img) VALUES (64, 'Dark Smoke', 'dark_smoke.png');
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
INSERT INTO items (id, nom, img) VALUES (77, 'Heat', 'heat.png');
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
INSERT INTO items (id, nom, img) VALUES (104, 'Sand', 'sand.png');
INSERT INTO items (id, nom, img) VALUES (105, 'Shield', 'shield.png');
INSERT INTO items (id, nom, img) VALUES (106, 'Soap', 'soap.png');
INSERT INTO items (id, nom, img) VALUES (107, 'Solar System', 'solar_system.png');
INSERT INTO items (id, nom, img) VALUES (108, 'Soup', 'soup.png');
INSERT INTO items (id, nom, img) VALUES (109, 'Stone', 'stone.png');
INSERT INTO items (id, nom, img) VALUES (110, 'Swamp', 'swamp.png');
INSERT INTO items (id, nom, img) VALUES (111, 'Wave', 'swave2.png');
INSERT INTO items (id, nom, img) VALUES (112, 'Table', 'table.png');
INSERT INTO items (id, nom, img) VALUES (113, 'Telescope', 'telescope.png');
INSERT INTO items (id, nom, img) VALUES (114, 'Thermometer', 'thermometer.png');
INSERT INTO items (id, nom, img) VALUES (115, 'Thunder', 'thundercloud.png');
INSERT INTO items (id, nom, img) VALUES (116, 'Torch', 'torch.png');
INSERT INTO items (id, nom, img) VALUES (117, 'Tornado', 'tornado.png');
INSERT INTO items (id, nom, img) VALUES (118, 'Trash', 'trash.png');
INSERT INTO items (id, nom, img) VALUES (119, 'Tree', 'tree.png');
INSERT INTO items (id, nom, img) VALUES (120, 'Truck', 'truck2.png');
INSERT INTO items (id, nom, img) VALUES (121, 'Village', 'village.png');
INSERT INTO items (id, nom, img) VALUES (122, 'Volcano', 'volcano.png');
INSERT INTO items (id, nom, img) VALUES (123, 'Egg', 'egg.png');
INSERT INTO items (id, nom, img) VALUES (124, 'Duck', 'duck.png');
INSERT INTO items (id, nom, img) VALUES (125, 'Bacteria', 'bacteria.png');
INSERT INTO items (id, nom, img) VALUES (126, 'Copper coil', 'coil.png');
INSERT INTO items (id, nom, img) VALUES (127, 'Wheel', 'wheel.png');
INSERT INTO items (id, nom, img) VALUES (128, 'Electricity', 'electricity.png');
INSERT INTO items (id, nom, img) VALUES (129, 'Oven', 'oven.png');
INSERT INTO items (id, nom, img) VALUES (130, 'Boat', 'boat.png');



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