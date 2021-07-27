const db = require('../database');


class Category {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM category WHERE id = $1',[id]);

        if (rows[0]) {
            return new Category(rows[0]);
        } else {
            throw new Error(`No category with id "${id}"`)
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM category;');

        return rows.map(cat => new Category(cat));
    }

    async save() {
        if (this.id) {
            // UPDATE
            try {
                const { rows } = await db.query('SELECT * FROM update_category($1);', [this]);
            } catch (error) {
                throw new Error(err.detail)
            }
        } else {
            try {
                // INSERT
                const { rows } = await db.query('SELECT * FROM new_category($1);', [this]);

                this.id = rows[0].id;

                return this;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }

    static async delete(id) {
        try {
            await db.query('DELETE FROM game_has_category WHERE category_id = $1;', [id]);
            const { rows } = await db.query('DELETE FROM category WHERE id = $1;', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(err.detail);
        }
    }
}

module.exports = Category;