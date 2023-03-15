const express = require("express");
const router = express.Router();
const passport = require("passport");
//------------Login page----------------------------------------------------------------------------------

//if it true than go to home page or not then go to login page
router.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return res.render("login");
});

router.get("/logout", function (req, res) {
  req.logout(req.user, function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

//-----------------------------------------------------------------------------------------------------------

module.exports = router;
