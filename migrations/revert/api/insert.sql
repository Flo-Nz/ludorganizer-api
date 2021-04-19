-- Revert pf_boardgames:api/insert from pg

BEGIN;

DROP FUNCTION new_boardgame(json);

COMMIT;

