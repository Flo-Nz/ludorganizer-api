-- Revert pf_boardgames:api/update from pg

BEGIN;

DROP FUNCTION update_boardgame(json);
DROP FUNCTION update_category(json);
DROP FUNCTION update_theme(json);
DROP FUNCTION update_member(json);
DROP FUNCTION update_bookmark(json);

COMMIT;
