-- Revert pf_boardgames:api/views from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW boardgames;

COMMIT;
