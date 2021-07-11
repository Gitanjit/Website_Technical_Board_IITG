const User = require("../models/user.js");
const passport = require("passport");

exports.getLoginPage = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/tech/admin");
    return res.render("login");
};

exports.getSignupPage = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/tech/admin");
    return res.render("signup");
};

exports.postSignup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            req.flash("error", "User already exists!");
        return res.redirect("/tech/admin/signup");
        }

        if (!username.includes("@iitg.ac.in")) {
            req.flash("error", "Invalid Email!");
        return res.redirect("/tech/admin/signup");
        }

        const newUser = new User({ username, name });
        const users = await User.find({});
        if (users.length == 0) {
            newUser.isAdmin = true;
        }

        const user = await User.register(newUser, password);

        if (!user) {
            req.flash("error", "Signup Failed!");
        return res.redirect("/tech/admin/signup");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to tech Portal!");
        return res.redirect("/tech/admin");
        });
    } catch (error) {
        console.log(error.message);
    }
};


exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully!");
    return res.redirect("/tech/admin/login");
  };

exports.getUsers = async (req, res) => {
    const users = await User.find({});
    return res.render("users/index", { users });
};
  
exports.changeAdmin = async (req, res) => {
    try {
      const id = req.params.user_id;
      const user = await User.findById(id);
      if (!user) {
        req.flash("error", "User doesn't exist!");
        return res.redirect("/tech/admin/users");
      }
      user.isAdmin = !user.isAdmin;
      await user.save();
      req.flash("success", "Admin status changed!");
      return res.redirect("/tech/admin/users");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/tech/admin");
    }
};
  
exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.user_id;
      await User.findByIdAndDelete(id);
      req.flash("success", "Successfully deleted user");
      res.redirect("/tech/admin/users");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/tech/admin");
    }
};