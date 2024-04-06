const mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "s2w1d1e0v5p0r3ac",
  database: "sw_dev",
});

module.exports = connection;
