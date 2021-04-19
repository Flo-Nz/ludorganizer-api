-- Deploy pf_boardgames:init to pg

BEGIN;

CREATE DOMAIN pint AS int CHECK (value > 0);

CREATE TABLE author (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL
);

CREATE TABLE editor (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE difficulty (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL
);

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE theme (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE boardgame (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    min_players pint NOT NULL,
    max_players pint NOT NULL,
    min_age pint NOT NULL,
    duration interval NOT NULL,
    picture_url text,
    author_id int NOT NULL REFERENCES "author" ("id") DEFAULT 1,
    editor_id int NOT NULL REFERENCES "editor" ("id") DEFAULT 1,
    difficulty_id int NOT NULL REFERENCES "difficulty" ("id") DEFAULT 1,
    CHECK (min_players < max_players)
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

INSERT INTO author (firstname, lastname) VALUES ('Auteur', 'Inconnu');
INSERT INTO editor ("name") VALUES ('Inconnu');
INSERT INTO difficulty ("label") VALUES ('Inconnue'), ('Enfantin'), ('Familial'), ('Intermédiaire'), ('Difficile'), ('Expert');

COMMIT;
