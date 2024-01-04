const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const asyncHandler = require("../utils/asyncHandler");
const Campground = require("../models/campground");
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware/middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(asyncHandler(campgrounds.index)) // All Campgrounds route
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    asyncHandler(campgrounds.createCampground)
  ); // Route to submit new campground to

// Route to serve a form to create a new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(asyncHandler(campgrounds.showCampground)) // Individual Campground route
  .put(
    isLoggedIn,
    upload.array("image"),
    isAuthor,
    validateCampground,
    asyncHandler(campgrounds.updateCampground)
  ) // Route for put request to update campground
  .delete(isLoggedIn, asyncHandler(campgrounds.deleteCampground)); // Route to delete a campground

// Route to serve edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  asyncHandler(campgrounds.renderEditForm)
);

module.exports = router;
