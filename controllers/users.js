const User = require("../models/user");

const UserController = {
  renderRegistrationForm: (req, res) => {
    res.render("users/register");
  },

  register: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp");
        res.redirect("/campgrounds");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("register");
    }
  },

  renderLoginForm: (req, res) => {
    res.render("users/login");
  },

  login: (req, res) => {
    req.flash("success", "Welcome Back");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
    delete req.session.returnTo;
  },

  logout: (req, res) => {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Goodbye!");
      res.redirect("/campgrounds");
    });
  },
};

module.exports = UserController;
