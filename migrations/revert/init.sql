-- Revert pf_boardgames:init from pg

BEGIN;

DROP TABLE member_has_game;
DROP TABLE game_has_theme;
DROP TABLE game_has_category;
DROP TABLE boardgame;
DROP TABLE member;
DROP TABLE theme;
DROP TABLE category;
DROP TABLE difficulty;
DROP TABLE editor;
DROP TABLE author;
DROP DOMAIN pint;
DROP DOMAIN email;
DROP EXTENSION citext;

COMMIT;
