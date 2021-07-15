-- Deploy boardgames:api/insert to pg

BEGIN;

CREATE FUNCTION new_boardgame(json) RETURNS boardgame AS $$
	INSERT INTO boardgame ("name", min_players, max_players, min_age, duration, picture_url, author_id, editor_id, difficulty_id)
	VALUES (
		$1->>'name',
		($1->>'min_players')::pint,
		($1->>'max_players')::pint,
		($1->>'min_age')::pint,
		($1 ->> 'duration')::pint,
		$1 ->> 'picture_url',
		($1 ->> 'author_id')::int,
		($1 ->> 'editor_id')::int,
		($1 ->> 'difficulty_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION new_category(json) RETURNS category AS $$
	INSERT INTO category ("name")
	VALUES (
		$1->>'name'
	)
	RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION new_theme(json) RETURNS theme AS $$
	INSERT INTO theme ("name")
	VALUES (
		$1->>'name'
	)
	RETURNING *;
$$ LANGUAGE sql;

COMMIT;
