-- Deploy boardgames:api/insert to pg

BEGIN;

CREATE FUNCTION new_boardgame(json) RETURNS boardgame AS $$
	INSERT INTO boardgame (name, min_players, max_players, min_age, duration, picture_url, author_id, editor_id, difficulty_id)
	VALUES (
		$1->>'name',
		($1->>'min_players')::pint,
		($1->>'max_players')::pint,
		($1->>'min_age')::pint,
		($1 ->> 'duration')::interval,
		$1 ->> 'picture_url',
		$1 ->> 'author_id',
		$1 ->> 'editor_id',
		$1 ->> 'difficulty_id'
	)
	RETURNING *;
$$ LANGUAGE sql;

COMMIT;
