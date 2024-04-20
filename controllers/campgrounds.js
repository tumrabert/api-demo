const Campground = require("../models/Campground")


let getAllCampgrounds = (req, res, next) => {
	Campground.getAllCampgrounds((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving Campgrounds.",
				success: false
			});
		else res.send(data);
	});
};

let getCampground = (req, res, next) => {
	Campground.getCampground(req.params.id, res);
};
let createCampground = (req, res, next) => {
	Campground.createCampground(req.body, res);
};

let updateCampground = (req, res, next) => {
	Campground.updateCampground(req.params.id, req.body, res);
};

let deleteCampground = (req, res, next) => {
	Campground.deleteCampground(req.params.id, res);
};

module.exports = { getAllCampgrounds, createCampground, deleteCampground, updateCampground, getCampground };
