const express = require("express");
const { getBookings,getBooking, deleteBooking, updateBooking } = require("../controllers/bookings");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");
// router.route("/").get(protect,authorization('admin'), getBookings).delete(protect,authorization('admin'), deleteBooking).put(protect,authorization('admin'), updateBooking);
// router.route("/:id").get(protect,getBooking).delete(protect, deleteBooking).put(protect, updateBooking);

// Routes for users
router.route("/")
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route("/:id")
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

// Routes for admin
router.route("/admin")
  .get(protect, authorization('admin'), getBookings)
  .put(protect, authorization('admin'), updateBooking)
  .delete(protect, authorization('admin'), deleteBooking);
module.exports = router;
