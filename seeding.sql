BEGIN;

INSERT INTO boardgame (name, author, editor, min_players, max_players, min_age)
VALUES ( 'Risk', 'John P', 'Ravensburger', 2, 6, 10),
( 'Zombicide', 'Pierre B', 'Epic Game', 2, 10, 14);

COMMIT;