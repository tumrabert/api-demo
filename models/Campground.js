const sql = require("../config/sw_dev");

const Campground = function (campground) {
  this.id = campground.id;
  this.name = campground.name;
  this.address = campground.address;
  this.telephone_number = campground.telephone_number;
};

Campground.getAllCampgrounds = (result) => {
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

Campground.getCampground = (id, res) => {
  sql.query(`SELECT * FROM campgrounds WHERE id = ${id}`, (err, data) => {
    if (!err) {
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(500).json({ success: false, message: "Error when updating campgrounds infos." });
    }
  });
};

Campground.createCampground = (campgroundObject, res) => {
  let query = `INSERT INTO campgrounds (name, address, telephone_number) VALUES (?, ?, ?);`;
  let name = campgroundObject.name;
  let address = campgroundObject.address;
  let telephone_number = campgroundObject.telephone_number;

  sql.query(query, [name, address, telephone_number], (err, data) => {
    if (!err) {
      res.status(201).json({ success: true, data: campgroundObject });
    } else {
      res.status(500).json({ success: false, message: "Error when updating campgrounds infos." });
    }
  });
};


Campground.updateCampground = (id, campgroundObject, res) => {

  const updates = [];
  if (campgroundObject.name) updates.push(`name = '${campgroundObject.name}'`);
  if (campgroundObject.address) updates.push(`address = '${campgroundObject.address}'`);
  if (campgroundObject.telephone_number) updates.push(`telephone_number = '${campgroundObject.telephone_number}'`);

  if (updates.length === 0) {
    res.status(400).json({ success: false, message: "No updates provided" });
    return;
  }

  const query = `UPDATE campgrounds SET ${updates.join(", ")} WHERE id = ${id}`;
  sql.query(query, (err, result) => {
    if (!err) {
      res.status(201).json({ success: true, message: "Campgrounds infos updated." });
    } else {
      res.status(500).json({ success: false, message: "Error when updating campgrounds infos." });
    }
  });

};




Campground.deleteCampground = (id, res) => {

  const query = `DELETE FROM campgrounds WHERE id = ${id}`;
  sql.query(query, (err, result) => {
    if (!err) {
      res.status(202).json({ success: true, message: "Campground deleted" });
    } else {
      res.status(500).json({ success: false, message: "Error when deleting campgrounds" });
    }
  });

};





module.exports = Campground;
