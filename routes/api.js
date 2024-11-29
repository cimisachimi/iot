const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Routes
router.post('/data', sensorController.receiveData);
router.get('/data', sensorController.getAllData);

module.exports = router;
