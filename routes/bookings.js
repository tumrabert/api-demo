const express = require("express");
const { getBookings, getBooking, deleteBooking, updateBooking, createBooking,AdminGetBookings,AdminUpdateBooking,AdminDeleteBooking } = require("../controllers/bookings");
const router = express.Router({ mergeParams: true });
const { protect, authorization } = require("../middleware/auth");

// Routes for admin
router.route("/admin")
  .get(protect, authorization('admin'), AdminGetBookings)

router.route("/admin/:id")
.put(protect, authorization('admin'), AdminUpdateBooking)
.delete(protect, authorization('admin'), AdminDeleteBooking );

// Routes for users
router.route("/")
  .post(protect, createBooking)
  .get(protect, getBookings);

router.route("/:id")
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);



module.exports = router;
