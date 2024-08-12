const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "asset_makers",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});


db.getConnection()
  .then((connection) => {
    connection.release();
  })
  .catch((err) => {
    console.error("Error getting database connection:", err);
  });

module.exports = db;
