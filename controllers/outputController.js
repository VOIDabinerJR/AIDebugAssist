const Output = require('../models/outputModel');

const outputController = {
    async createOutput(req, res) {
        const { message, inputId } = req.body;
        const userId = req.userId;

        if (!message || !inputId) {
            return res.status(400).json({ error: 'Message and inputId are required' });
        }

        try {
            const result = await Output.create({ message, input_id: inputId, user_id: userId });
            return res.status(201).json({ success: true, outputId: result[0].insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    async getOutputsByUser(req, res) {
        const userId = req.userId;

        try {
            const [outputs] = await Output.findByUserId(userId);
            return res.status(200).json(outputs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    async getOutputsByInput(req, res) {
        const inputId = req.params.inputId;

        try {
            const [outputs] = await Output.findByInputId(inputId);
            return res.status(200).json(outputs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = outputController;
