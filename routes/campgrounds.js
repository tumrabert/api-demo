const express = require("express");
const getCampgrounds = require("../controllers/campgrounds");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");
router.route("/").get(protect, getCampgrounds);

module.exports = router;
