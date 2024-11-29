const db = require('../config/db');

// Save sensor data
exports.saveSensorData = ({ sensorType, value, unit, timestamp }) => {
  const query = `
    INSERT INTO sensor_data (sensor_type, value, unit, timestamp)
    VALUES (?, ?, ?, ?)
  `;
  return db.execute(query, [sensorType, value, unit || null, timestamp]);
};

// Retrieve all sensor data
exports.getAllSensorData = () => {
  const query = `SELECT * FROM sensor_data ORDER BY timestamp DESC`;
  return db.query(query).then(([rows]) => rows);
};
