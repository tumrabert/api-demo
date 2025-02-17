const mysql = require("mysql");
var connection = mysql.createPool({
  host: "campground-db1.cn6uyci2itoi.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "s2w1d1e0v5p0r3ac",
  database: "campground_db",
});

module.exports = connection;
