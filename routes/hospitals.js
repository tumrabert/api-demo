const express = require("express");
const {
  createHospital,
  getHospital,
  getHospitals,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const router = express.Router();
const { protect,authorization } = require("../middleware/auth");


router.route("/").get(getHospitals).post(protect,authorization('admin') ,createHospital);
router.route("/:id").get(getHospital).delete(protect,authorization('admin'), deleteHospital).put(protect,authorization('admin'), updateHospital);

module.exports = router;
