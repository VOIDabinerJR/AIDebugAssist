const { decode } = require('jsonwebtoken');
const Input = require('../models/inputModel');
const { ask,ask2 } = require('../utils/aidebugassist'); // Assuming you have a function to handle the ask logic
const Output = require('../models/outputModel');

const inputController = {
    async createInput(req, res) {
        const startTime = Date.now();

        const { input } = req.body;
       
      

        if (!input) {
            return res.status(400).json({ error: 'Message is required' });
        }
      
        try { 
            const result = await Input.create({ message:input, user_id: 1 });


            try {
                //  const output = await ask2(input) 
                const output = await ask(input) 
             
                const resultOut = await Output.create({ message:output, user_id: 1,input_id: result[0].insertId  });
                const endTime = Date.now();
                const executionTime = endTime - startTime;
                return res.status(201).json({ output: output, success: true, inputId: result[0].insertId,  executionTime: `${executionTime} ms`});
               
               


            } catch (error) {
                console.log(   error)
                
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }, 

    async getInputsByUser(req, res) {
        const userId = req.userId;

        try {
            const [inputs] = await Input.findByUserId(userId);
            return res.status(200).json(inputs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = inputController;
