const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");
const { storeReturnTo } = require("../middleware/middleware");
const passport = require("passport");
const users = require("../controllers/users");
const UserController = require("../controllers/users");

router
  .route("/register")
  .get(UserController.renderRegistrationForm)
  .post(asyncHandler(UserController.register));

router
  .route("/login")
  .get(UserController.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    UserController.login
  );

router.get("/logout", UserController.logout);

module.exports = router;
