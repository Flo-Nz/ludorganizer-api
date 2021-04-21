-- Revert pf_boardgames:api/update from pg

BEGIN;

DROP FUNCTION update_boardgame(json);

COMMIT;
