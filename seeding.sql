BEGIN;

INSERT INTO category ("name") VALUES
('Deck-building'),
('Coopératif'),
('Cartes'),
('Gestion de ressources'),
('Construction'),
('Stratégie'),
('Narratif'),
('Roles'),
('Enchères'),
('Duo');

INSERT INTO theme ("name") VALUES
('Fantasy'),
('Mythologie'),
('Histoire'),
('Culture'),
('Asie'),
('Art'),
('Survie'),
('Aucun');

INSERT INTO boardgame ("name", min_players, max_players, min_age, duration, picture_url, difficulty_id) VALUES
('Galerapagos', 3, 12, 10, 20, 'https://cdn3.philibertnet.com/384527-large_default/galerapagos.jpg', 3),
('Royauté Vs Religion : Révolution (RRR)', 2, 2, 14, 10, 'https://cdn1.philibertnet.com/475161-large_default/royaute-vs-religion-revolution-rrr.jpg', 4),
('Smallworld', 2, 5, 8, 90, 'https://cdn2.philibertnet.com/385636-large_default/small-world.jpg', 4);

INSERT INTO game_has_category (game_id, category_id) VALUES
(1,1),
(1,2),
(1,4),
(2,6),
(2,10),
(3,6);

INSERT INTO game_has_theme (game_id, theme_id) VALUES
(1,7),
(2,3),
(3,1);

COMMIT;