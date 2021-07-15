const db = require('../database');


class Theme {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM theme WHERE id = $1',[id]);

        if (rows[0]) {
            return new Theme(rows[0]);
        } else {
            throw new Error(`No theme with id "${id}"`)
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM theme;');

        return rows.map(theme => new Theme(theme));
    }

    async save() {
        if (this.id) {
            // UPDATE
            try {
                const { rows } = await db.query('SELECT * FROM update_theme($1);', [this]);
            } catch (error) {
                throw new Error(err.detail)
            }
        } else {
            try {
                // INSERT
                const { rows } = await db.query('SELECT * FROM new_theme($1);', [this]);

                this.id = rows[0].id;

                return this;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }

    static async delete(id) {
        try {
            const { rows } = await db.query('DELETE FROM theme WHERE id = $1;', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(err.detail);
        }
    }
}

module.exports = Category;