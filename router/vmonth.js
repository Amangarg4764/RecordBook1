const express = require("express");
const router = express.Router();
const VehicleList = require("../model/addVehicle");
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");
const OtherThisList = require("../model/other");

//CRUD operation on vehical month
router.get("/getMonths", async function (req, res) {
  let data = await VehicleList.findById(req.query.id).populate("months").exec();
  return res.render("monpage", { vmdata: data });
});

router.post("/addMonth", async function (req, res) {
  let vfdata;

  vfdata = await VehicleList.findById(req.query.vid);
  let newdata = await MonthsDetails.create({
    mname: req.body.title.toUpperCase(),
    vname: vfdata.id,
  });
  vfdata.months.push(newdata.id);
  vfdata.save();

  return res.redirect("back");
});

router.post("/updateMonth", async function (req, res) {
  let data = await MonthsDetails.findByIdAndUpdate(req.query.id, {
    mname: req.body.title,
  });
  return res.redirect("back");
});

router.get("/deleteMonth", async function (req, res) {
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
  }
  let deddata = await journeyList.deleteMany({ mowner: req.query.id });

  let mdata = await MonthsDetails.findByIdAndDelete(req.query.id);
  let vdata = await VehicleList.findByIdAndUpdate(mdata.vname, {
    $pull: { months: req.query.id },
  });
  return res.redirect("back");
});

module.exports = router;
