const express = require("express");
const router = express.Router();
const passport = require("passport");
const PersonalList = require("../model/personal");
const PersonalMonth = require("../model/personalMonth");
const OtherThisList = require("../model/other");
const UserList = require("../model/user");

router.post(
  "/addPersonal",
  passport.checkAuthentication,
  async function (req, res) {
    let po = await PersonalList.create({
      title: req.body.title,
      user: req.user.id,
    });
    let user = await UserList.findById(req.user.id);
    user.olist.push(po.id);
    user.save();
    if (req.xhr) {
      return res.status(200).json({
        data: po,
        base: "personal",
      });
    }
    return res.redirect("back");
  }
);

router.post(
  "/updatePersonal",
  passport.checkAuthentication,
  async function (req, res) {
    await PersonalList.findByIdAndUpdate(req.query.id, {
      title: req.body.title,
    });
    return res.redirect("back");
  }
);

router.get(
  "/deletePersonal",
  passport.checkAuthentication,
  async function (req, res) {
    await UserList.findByIdAndUpdate(req.user.id, {
      $pull: { olist: req.query.id },
    });
    let data = await PersonalList.findById(req.query.id)
      .populate("child")
      .exec();
    for (i of data.child) {
      await OtherThisList.deleteMany({ listowner: i._id });
    }
    await PersonalMonth.deleteMany({ parent: req.query.id });
    await PersonalList.findByIdAndDelete(req.query.id);
    if (req.xhr) {
      return res.status(200).json({
        data: "right",
      });
    }
    return res.redirect("back");
  }
);

module.exports = router;
