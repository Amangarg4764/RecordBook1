const express = require("express");
const router = express.Router();
const passport = require("passport");
//link on google button give

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//get ans from google
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    return res.redirect("/home");
  }
);
module.exports = router;
