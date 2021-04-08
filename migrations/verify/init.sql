-- Verify pf_boardgames:init on pg

BEGIN;

SELECT min_players FROM boardgame;

ROLLBACK;
