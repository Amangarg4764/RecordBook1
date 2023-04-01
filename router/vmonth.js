const express = require("express");
const router = express.Router();
const VehicleList = require("../model/addVehicle");
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");
const OtherThisList = require("../model/other");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
//CRUD operation on vehical month
router.get(
  "/getMonths",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await VehicleList.findById(req.query.id)
      .populate("months")
      .exec();
    return res.render("monpage", { vmdata: data });
  }
);

router.post(
  "/addMonth",
  passport.checkAuthentication,
  async function (req, res) {
    let vfdata;

    vfdata = await VehicleList.findById(req.query.vid);
    let newdata = await MonthsDetails.create({
      mname: req.body.title.toUpperCase(),
      vname: vfdata.id,
    });
    vfdata.months.push(newdata.id);
    vfdata.save();
    if (req.xhr) {
      return res.status(200).json({
        data: newdata,
        base: "vehicleMonth",
      });
    }
    return res.redirect("back");
  }
);

router.post(
  "/updateMonth",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await MonthsDetails.findByIdAndUpdate(req.query.id, {
      mname: req.body.title,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: req.query.id,
      });
    }
    return res.redirect("back");
  }
);

router.get(
  "/deleteMonth",
  passport.checkAuthentication,
  async function (req, res) {
    //other list delete
    let data = await OtherList.find({ mowner: req.query.id });
    for (i of data) {
      let c = await OtherThisList.deleteMany({ listowner: i.id });
    }
    let dedata = await OtherList.deleteMany({ mowner: req.query.id });
    //jorney list delete
    let jdata = await journeyList.find({ mowner: req.query.id });
    for (i of jdata) {
      let c = await OtherThisList.deleteMany({ listowner: i.id });
      if (i.image.length != 0) {
        for (k of i.image) {
          fs.unlinkSync(path.join(__dirname, "../", k));
        }
      }
    }
    let deddata = await journeyList.deleteMany({ mowner: req.query.id });

    let mdata = await MonthsDetails.findByIdAndDelete(req.query.id);
    let vdata = await VehicleList.findByIdAndUpdate(mdata.vname, {
      $pull: { months: req.query.id },
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
