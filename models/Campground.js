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


Campground.createCampground = (campgroundObject, result) => {
  let query = `INSERT INTO campgrounds (name, address, telephone_number) VALUES (?, ?, ?);`;
  let name = campgroundObject.name;
  let address = campgroundObject.address;
  let telephone_number = campgroundObject.telephone_number;

  sql.query(query, [name, address, telephone_number], (err, res) => {
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
