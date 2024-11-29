require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const { URL } = require('url');

// Check if MYSQL_URL is defined
if (!process.env.MYSQL_URL) {
  console.error('MYSQL_URL is not defined in the .env file');
  process.exit(1);
}

// Parse MySQL URL
const dbUrl = new URL(process.env.MYSQL_URL);

// Create connection pool
const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port: dbUrl.port || 3306,
  ssl: {
    ca: fs.existsSync('./certs/ca.pem') ? fs.readFileSync('./certs/ca.pem') : undefined,
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    const [rows] = await connection.query('SELECT DATABASE() AS dbName');
    console.log('Connected to database:', rows[0].dbName);
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();

module.exports = pool;
