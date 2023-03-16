const express = require("express");
const router = express.Router();
const passport = require("passport");
const Userlist = require("../model/user");
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
router.get("/profile", passport.checkAuthentication, async function (req, res) {
  let data = await Userlist.findById(req.query.id)

    .populate({
      path: "vlist",
      populate: {
        path: "months",
        populate: { path: "journeys" },
      },
    })
    .populate({
      path: "vlist",
      populate: {
        path: "months",
        populate: { path: "otherExp" },
      },
    })
    .populate({ path: "olist", populate: { path: "child" } });
  return res.render("profile", { data: data });
});

router.post(
  "/edituser",
  passport.checkAuthentication,
  async function (req, res) {
    let us = await Userlist.findByIdAndUpdate(req.query.id, {
      name: req.body.uname,
    });

    return res.redirect("back");
  }
);

module.exports = router;
