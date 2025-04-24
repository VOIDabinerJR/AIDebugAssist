const db = require('../config/db');

const Output = {
    async create(output) {
        const result = await db.query('INSERT INTO output SET ?', output);
        return result;
    },
    async findByInputId(inputId) {
        const result = await db.query('SELECT * FROM output WHERE input_id = ?', [inputId]);
        return result;
    },
    async findByUserId(userId) {
        const result = await db.query('SELECT * FROM output WHERE user_id = ?', [userId]);
        return result;
    }
};

module.exports = Output;
