const express = require('express');
const router = express.Router();

const inputController = require('../controllers/inputController');
const outputController = require('../controllers/outputController');

router.post('/in', inputController.createInput);
router.post('/out', outputController.createOutput);

 

module.exports = router;
 