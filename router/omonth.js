const express = require("express");
const router = express.Router();
const PersonalList = require("../model/personal");
const PersonalMonth = require("../model/personalMonth");
const OtherThisList = require("../model/other");
const passport = require("passport");
router.get(
  "/getPersonalMonth",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await PersonalList.findById(req.query.id)
      .populate("child")
      .exec();

    return res.render("personalMonthPage", { data: data });
  }
);

router.post(
  "/addPersonalMonth",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await PersonalList.findById(req.query.id);
    let subdata = await PersonalMonth.create({
      title: req.body.title,
      parent: req.query.id,
    });
    data.child.push(subdata.id);
    data.save();
    if (req.xhr) {
      return res.status(200).json({
        data: subdata,
        base: "personalMonth",
      });
    }
    return res.redirect("back");
  }
);

router.post(
  "/updatePersonalMonth",
  passport.checkAuthentication,
  async function (req, res) {
    await PersonalMonth.findByIdAndUpdate(req.query.id, {
      title: req.body.title,
    });
    return res.redirect("back");
  }
);

router.get(
  "/deletePersonalMonth",
  passport.checkAuthentication,
  async function (req, res) {
    await OtherThisList.deleteMany({ listowner: req.query.id });
    let data = await PersonalMonth.findByIdAndDelete(req.query.id);
    let pdata = await PersonalList.findByIdAndUpdate(data.parent, {
      $pull: { child: req.query.id },
    });
    if (req.xhr) {
      return res.status(200).json({
        data: "right",
      });
    }
    return res.redirect("back");
  }
);

module.exports = router;
