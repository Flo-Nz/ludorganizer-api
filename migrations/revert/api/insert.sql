-- Revert pf_boardgames:api/insert from pg

BEGIN;

DROP FUNCTION new_boardgame(json);
DROP FUNCTION new_category(json);
DROP FUNCTION new_theme(json);
DROP FUNCTION new_member(json);
DROP FUNCTION new_bookmark(json);

COMMIT;

