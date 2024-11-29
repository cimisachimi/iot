const SensorData = require('../models/sensorData');

// Receive and save sensor data
exports.receiveData = async (req, res) => {
  const { sensorType, value, unit } = req.body;

  try {
    await SensorData.saveSensorData({
      sensorType,
      value,
      unit,
      timestamp: new Date(),
    });
    res.status(201).json({ message: 'Sensor data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save sensor data' });
  }
};

// Retrieve all sensor data
exports.getAllData = async (req, res) => {
  try {
    const data = await SensorData.getAllSensorData();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve sensor data' });
  }
};
