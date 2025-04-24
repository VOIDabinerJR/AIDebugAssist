const db = require('../config/db');

const Input = {
    async create(input) {
        const result = await db.query('INSERT INTO input SET ?', input);
        return result;
    },
    async findByUserId(userId) {
        const result = await db.query('SELECT * FROM input WHERE user_id = ?', [userId]);
        return result;
    },
    async findById(id) {
        const result = await db.query('SELECT * FROM input WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Input;
