const express = require("express");
const { getCampground, createCampground, getAllCampgrounds, deleteCampground, updateCampground } = require("../controllers/campgrounds");
const router = express.Router({ mergeParams: true });
const { protect, authorization } = require("../middleware/auth");
router.route("/").get(getAllCampgrounds)
router.route("/").post(protect, authorization("admin"), createCampground)
router.route("/:id").get(protect, getCampground)
router.route("/:id").delete(protect, authorization("admin"), deleteCampground)
router.route("/:id").put(protect, authorization("admin"), updateCampground)

module.exports = router;
