// const mysql = require("mysql2");

// const db = mysql.createConnection({
// host: "localhost",
// user: "satya1",
// password: "satya234$",
// database: "asset_makers",
// });

// module.exports = db;

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "asset_makers",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

