const Campground = require("../models/Campground")


getCampgrounds = (req, res, next) => {
	Campground.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving Campgrounds.",
			});
		else res.send(data);
	});
};


createCampground = (req, res, next) => {
	Campground.createCampground(req.body, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating a campground.",
			});
		else res.status(201).json({
			success: true,
		});
	});
};





module.exports = { getCampgrounds, createCampground };
