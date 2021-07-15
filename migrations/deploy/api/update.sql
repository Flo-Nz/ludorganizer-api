-- Deploy pf_boardgames:api/update to pg

BEGIN;

CREATE FUNCTION update_boardgame(json) RETURNS boardgame AS $$
	UPDATE boardgame SET 
		"name" = $1->>'name', 
		min_players = ($1->>'min_players')::pint, 
		max_players = ($1->>'max_players')::pint, 
		min_age = ($1->>'min_age')::pint, 
		duration = ($1->>'duration')::pint, 
		picture_url = $1->>'picture_url', 
		author_id = ($1->>'author_id')::int, 
		editor_id = ($1->>'editor_id')::int, 
		difficulty_id = ($1->>'difficulty_id')::int
	WHERE id = ($1->>'id')::int
	RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION update_category(json) RETURNS category AS $$
	UPDATE category SET 
		"name" = $1->>'name' 
	WHERE id = ($1->>'id')::int
	RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION update_theme(json) RETURNS theme AS $$
	UPDATE theme SET 
		"name" = $1->>'name' 
	WHERE id = ($1->>'id')::int
	RETURNING *;
$$ LANGUAGE sql;

COMMIT;
