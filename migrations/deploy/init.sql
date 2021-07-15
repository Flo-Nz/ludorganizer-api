-- Deploy pf_boardgames:init to pg

BEGIN;

CREATE DOMAIN pint AS int CHECK (value > 0);
CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
  CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE TABLE author (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL
);

CREATE TABLE editor (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE
);

CREATE TABLE difficulty (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL UNIQUE
);

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE
);

CREATE TABLE theme (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE
);

CREATE TABLE member (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "email" email NOT NULL UNIQUE
);

CREATE TABLE boardgame (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    min_players pint NOT NULL,
    max_players pint NOT NULL,
    min_age pint NOT NULL,
    duration pint NOT NULL,
    picture_url text,
    author_id int NOT NULL REFERENCES "author" ("id") DEFAULT 1,
    editor_id int NOT NULL REFERENCES "editor" ("id") DEFAULT 1,
    difficulty_id int NOT NULL REFERENCES "difficulty" ("id") DEFAULT 1,
    CHECK (min_players <= max_players)
);

CREATE TABLE game_has_category (
    game_id int NOT NULL REFERENCES "boardgame" ("id"),
    category_id int NOT NULL REFERENCES "category" ("id"),
    PRIMARY KEY ("game_id", "category_id")
);

CREATE TABLE game_has_theme (
    game_id int NOT NULL REFERENCES "boardgame" ("id"),
    theme_id int NOT NULL REFERENCES "theme" ("id"),
    PRIMARY KEY ("game_id", "theme_id")
);

CREATE TABLE member_has_game (
    member_id int NOT NULL REFERENCES "member" ("id"),
    game_id int NOT NULL REFERENCES "boardgame" ("id"),
    game_count int NOT NULL DEFAULT 0,
    PRIMARY KEY ("member_id", "game_id")
);



INSERT INTO author (firstname, lastname) VALUES ('Auteur', 'Inconnu');
INSERT INTO editor ("name") VALUES ('Inconnu');
INSERT INTO difficulty ("label") VALUES ('Inconnue'), ('Enfantin'), ('Familial'), ('Intermédiaire'), ('Difficile'), ('Expert');

COMMIT;
