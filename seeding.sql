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

COMMIT;