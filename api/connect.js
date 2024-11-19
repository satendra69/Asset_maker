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


// const mysql = require("mysql2");

// const db = mysql.createConnection({
// host: "localhost",
// user: "satya1",
// password: "satya234$",
// database: "asset_makers",
// });

// module.exports = db;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "satya1",
//   password: "satya234$",
//   database: "asset_makers",
//   waitForConnections: true,
//   connectionLimit: 10, // Adjust based on your application's needs
//   queueLimit: 0,
// });

// module.exports = pool.promise(); // Use promise-based pool for async/await
