const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { isLoggedIn, isAdmin } = require("../middleware");
const User = require("../models/user");
const authController = require("../controllers/auth.controller");

router.get("/login", authController.getLoginPage);

router.get("/", isLoggedIn, async (req, res) => {
  res.render("admin");
});

router.get("/signup", authController.getSignupPage);

router.post("/signup", authController.postSignup);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/tech/admin/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome to Technical Board Portal!");
    return res.redirect("/tech/admin");
  }
);

router.get("/logout", authController.logout);

router.get("/users", isLoggedIn, isAdmin, authController.getUsers);

router.get(
  "/users/:user_id/changeAdminStatus",
  isLoggedIn,
  isAdmin,
  authController.changeAdmin
);

router.delete(
  "/users/:user_id/",
  isLoggedIn,
  isAdmin,
  authController.deleteUser
);

module.exports = router;