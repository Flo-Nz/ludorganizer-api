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
('Construction'),
('Enchères'),
('Duo');

INSERT INTO theme ("name") VALUES
('Fantasy'),
('Mythologie'),
('Histoire'),
('Culture'),
('Asie'),
('Art'),
('Aucun');

INSERT INTO boardgame ("name", min_players, max_players, min_age, duration, author_id, editor_id, difficulty_id) VALUES 
('Crystal Clans',)

COMMIT;