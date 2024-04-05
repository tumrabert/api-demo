const sql = require("../config/sw_dev");

const Campground = function (campground) {
  this.id = campground.id;
  this.name = campground.name;
  this.address = campground.address;
  this.telephone_number = campground.telephone_number;
};

Campground.getAll = (result) => {
  sql.query("SELECT * FROM campgrounds;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Campground: ", res);
    result(null, res);
  });
};

module.exports = Campground;
