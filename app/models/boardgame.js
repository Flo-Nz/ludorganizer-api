const db = require('../database');


class Boardgame {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1',[id]);

        if (rows[0]) {
            return new Boardgame(rows[0]);
        } else {
            throw new Error(`No boardgame with id "${id}"`)
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(bg => new Boardgame(bg));
    }

    async save() {
        if (this.id) {
            // UPDATE
        } else {
            try {
                // INSERT
                const { rows } = await db.query('SELECT * FROM new_boardgame($1);', [this]);

                this.id = rows[0].id;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }
}

module.exports = Boardgame;