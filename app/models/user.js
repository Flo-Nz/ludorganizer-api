const db = require('../database');

class User {

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findByUsername(username) {
        const { rows } = await db.query('SELECT * FROM member WHERE username = $1',[username]);

        if (rows[0]) {
            return new User(rows[0]);
        } else {
            throw new Error(`No User with username "${username}"`);
        }
    }

    static async findOne(id) {
        const query = `SELECT * FROM member WHERE id = $1`;
        const { rows } = await db.query(query,[id]);

        if (rows[0]) {
            return new User(rows[0]);
        } else {
            return new Error(`No user with id "${id}`);
        }
    }

    async save() {   
        if (this.id) {
            await db.query('SELECT * FROM update_member($1);', [this]);

        } else {
            const { rows } = await db.query('SELECT * FROM new_member($1);', [this]);

            for (const prop in rows[0]) {
                this[prop] = rows[0][prop];
            }

            delete this.password;

            return this; 
        }
    }
}

module.exports = User;