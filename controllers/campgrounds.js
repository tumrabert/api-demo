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

module.exports = getCampgrounds;
