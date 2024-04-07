const express = require("express");
const { getCampgrounds, createCampground } = require("../controllers/campgrounds");
const router = express.Router({ mergeParams: true });
const { protect, authorization } = require("../middleware/auth");
router.route("/").get(protect, getCampgrounds).post(protect, authorization("admin"), createCampground);
module.exports = router;
