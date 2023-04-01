const express = require("express");
const router = express.Router();
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const OtherThisList = require("../model/other");
const passport = require("passport");
router.get("/getJAO", passport.checkAuthentication, async function (req, res) {
  let mdata = await MonthsDetails.findById(req.query.id)
    .populate("otherExp")
    .populate("vname")
    .populate("journeys")
    .exec();

  return res.render("jao", { data: mdata });
});

router.post(
  "/addOtherExpensive",
  passport.checkAuthentication,
  async function (req, res) {
    let otherdata = await OtherList.create({
      oname: req.body.title.toUpperCase(),
      mowner: req.query.id,
      totalPrice: 0,
    });
    let mdata = await MonthsDetails.findById(req.query.id);
    mdata.otherExp.push(otherdata.id);
    mdata.save();
    if (req.xhr) {
      return res.status(200).json({
        data: otherdata,
        base: "vehicleOther",
      });
    }
    return res.redirect("back");
  }
);

router.post(
  "/updateOtherExpensive",
  passport.checkAuthentication,
  async function (req, res) {
    await OtherList.findByIdAndUpdate(req.query.id, {
      oname: req.body.title.toUpperCase(),
    });
    return res.redirect("back");
  }
);

router.get(
  "/deleteOtherExpensive",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await OtherThisList.deleteMany({ listowner: req.query.id });
    let odata = await OtherList.findByIdAndDelete(req.query.id);
    await MonthsDetails.findByIdAndUpdate(odata.mowner, {
      $pull: { otherExp: req.query.id },
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
