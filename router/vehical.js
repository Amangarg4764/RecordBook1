const express = require("express");
const router = express.Router();
const VehicleList = require("../model/addVehicle");
const PersonalList = require("../model/personal");
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");
const OtherThisList = require("../model/other");

//CRUD operation on vehical
router.get("/home", async function (req, res) {
  var vdata = await VehicleList.find({});
  var odata = await PersonalList.find({});
  return res.render("home", { vdata: vdata, odata: odata });
});

router.post("/addVehicle", async function (req, res) {
  await VehicleList.create({ vname: req.body.title.toUpperCase() });
  return res.redirect("back");
});

router.post("/updateVehicalName", async function (req, res) {
  await VehicleList.findByIdAndUpdate(req.query.id, {
    vname: req.body.title.toUpperCase(),
  });
  return res.redirect("back");
});

router.get("/deleteVehicle", async function (req, res) {
  // To empty an array
  //let vdata=await VehicleList.findById(req.query.id);
  //  vdata.months.splice(0, vdata.months.length)
  //vdata.save()
  let data = await VehicleList.findByIdAndDelete(req.query.id);
  for (i of data.months) {
    //other list delete
    let data = await OtherList.find({ mowner: i });
    for (j of data) {
      let c = await OtherThisList.deleteMany({ listowner: j.id });
    }
    let dedata = await OtherList.deleteMany({ mowner: i });
    //jorney list delete
    let jdata = await journeyList.find({ mowner: i });
    for (j of jdata) {
      let c = await OtherThisList.deleteMany({ listowner: j.id });
    }
    let deddata = await journeyList.deleteMany({ mowner: i });

    let mdata = await MonthsDetails.findByIdAndDelete(i);
  }

  return res.redirect("back");
});

module.exports = router;
