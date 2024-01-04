const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/review");

const Review = require("../models/review");
const asyncHandler = require("../utils/asyncHandler");
const Campground = require("../models/campground");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware/middleware");

// Reviews route to post a review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncHandler(reviews.createReview)
);

// Route to delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncHandler(reviews.deleteReview)
);

module.exports = router;
