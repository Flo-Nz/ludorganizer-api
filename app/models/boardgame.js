const db = require('../database');


class Boardgame {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM boardgames WHERE id = $1',[id]);

        if (rows[0]) {
            return new Boardgame(rows[0]);
        } else {
            throw new Error(`No boardgame with id "${id}"`)
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM boardgames;');

        return rows.map(bg => new Boardgame(bg));
    }

    static async findByCat(catId) {
        const { rows } = await db.query('SELECT * FROM boardgames;');
        // Je prépare un tableau qui contiendra mes résultats
        const result = [];

        // Je boucle sur chaque boardgame puis sur chaque catégorie du boardgame en cours. Si l'id de la catégorie correspond à celle recherchée, je l'ajoute aux résultats.
        for (const row of rows) {
            for (const category of row.categories) {
                if (category.id === catId) {
                    result.push(row);
                }
            }
        }

        return result.map(bg => new Boardgame(bg));
    }

    static async findByTheme(themeId) {
        const { rows } = await db.query('SELECT * FROM boardgames;');
        // Je prépare un tableau qui contiendra mes résultats
        const result = [];

        // Je boucle sur chaque boardgame puis sur chaque catégorie du boardgame en cours. Si l'id de la catégorie correspond à celle recherchée, je l'ajoute aux résultats.
        for (const row of rows) {
            for (const theme of row.themes) {
                if (theme.id === themeId) {
                    result.push(row);
                }
            }
        }
        
        return result.map(bg => new Boardgame(bg));
    }

    async save() {
        if (this.id) {
            // UPDATE
            try {
                const { rows } = await db.query('SELECT * FROM update_boardgame($1);', [this]);
            } catch (error) {
                throw new Error(err.detail)
            }
        } else {
            try {
                // INSERT
                // These props are not mandatory so we save default values and insert it into our instance if necessary.
                const defaults = {
                    author_id: 1,
                    editor_id: 1,
                    difficulty_id: 1
                }

                if (!this.author_id) {
                    this.author_id = defaults.author_id;
                }
                if (!this.editor_id) {
                    this.editor_id = defaults.editor_id;
                }
                if (!this.difficulty_id) {
                    this.difficulty_id = defaults.difficulty_id;
                }

                // Once our instance is complete, insert it into the database using new_boardgame SQL function.

                const { rows } = await db.query('SELECT * FROM new_boardgame($1);', [this]);

                this.id = rows[0].id;

                return this;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }

    static async delete(id) {
        try {
            // TODO penser à changer la requête dans le cas où le jeu est une extension.
            await db.query('DELETE FROM game_has_category WHERE game_id = $1;', [id]);
            await db.query('DELETE FROM game_has_theme WHERE game_id = $1;', [id]);
            await db.query('DELETE FROM member_has_game WHERE game_id = $1;', [id]);
            
            const { rows } = await db.query('DELETE FROM boardgame WHERE id = $1;', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(err.detail);
        }
    }
}

module.exports = Boardgame;