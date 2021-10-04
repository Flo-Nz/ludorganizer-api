const db = require('../database');


class Difficulty {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM difficulty WHERE id = $1',[id]);

        if (rows[0]) {
            return new Difficulty(rows[0]);
        } else {
            throw new Error(`No difficulty with id "${id}"`)
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM difficulty;');

        return rows.map(difficulty => new Difficulty(difficulty));
    }
}

module.exports = Difficulty;