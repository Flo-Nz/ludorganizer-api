-- Deploy pf_boardgames:api/views to pg

BEGIN;

CREATE VIEW boardgames AS (
    SELECT boardgame.id, boardgame.name, boardgame.min_players, boardgame.max_players, boardgame.duration, boardgame.picture_url,
    array_to_json(array_remove(array_agg(DISTINCT categories), NULL)) AS categories,
    array_to_json(array_remove(array_agg(DISTINCT themes), NULL)) AS themes,
	array_to_json(array_remove(array_agg(DISTINCT difficulty), NULL)) AS difficulty,
	array_to_json(array_remove(array_agg(DISTINCT author), NULL)) AS author,
	array_to_json(array_remove(array_agg(DISTINCT editor), NULL)) AS editor
    FROM boardgame
    LEFT JOIN (
        SELECT id, label FROM difficulty
    ) AS difficulty ON boardgame.difficulty_id = difficulty.id
    LEFT JOIN (
        SELECT id, firstname, lastname FROM author
    ) AS author ON boardgame.author_id = author.id
    LEFT JOIN (
        SELECT id, "name" FROM editor
    ) AS editor ON boardgame.editor_id = editor.id
    LEFT JOIN game_has_category ON game_has_category.game_id = boardgame.id
    LEFT JOIN (
        SELECT id, "name" FROM category
    ) AS categories ON categories.id = game_has_category.category_id
    LEFT JOIN game_has_theme ON game_has_theme.game_id = boardgame.id
    LEFT JOIN (
        SELECT id, "name" FROM theme
    ) AS themes ON themes.id = game_has_theme.theme_id
    GROUP BY boardgame.id
);

COMMIT;
