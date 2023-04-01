const express = require("express");
const router = express.Router();
const VehicleList = require("../model/addVehicle");
const PersonalList = require("../model/personal");
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");
const OtherThisList = require("../model/other");
const UserList = require("../model/user");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
//CRUD operation on vehical
router.get("/home", passport.checkAuthentication, async function (req, res) {
  var vdata = await VehicleList.find({ user: req.user.id });
  var odata = await PersonalList.find({ user: req.user.id });
  return res.render("home", { vdata: vdata, odata: odata });
});

router.post(
  "/addVehicle",
  passport.checkAuthentication,
  async function (req, res) {
    let veh = await VehicleList.create({
      vname: req.body.title.toUpperCase(),
      user: req.user.id,
    });
    let user = await UserList.findById(req.user.id);
    user.vlist.push(veh.id);
    user.save();
    if (req.xhr) {
      return res.status(200).json({
        data: veh,
        base: "vehicle",
      });
    }
    return res.redirect("back");
  }
);

router.post(
  "/updateVehicalName",
  passport.checkAuthentication,
  async function (req, res) {
    await VehicleList.findByIdAndUpdate(req.query.id, {
      vname: req.body.title.toUpperCase(),
    });
    return res.redirect("back");
  }
);

router.get(
  "/deleteVehicle",
  passport.checkAuthentication,
  async function (req, res) {
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
        if (j.image.length != 0) {
          for (k of j.image) {
            fs.unlinkSync(path.join(__dirname, "../", k));
          }
        }
      }
      let deddata = await journeyList.deleteMany({ mowner: i });

      let mdata = await MonthsDetails.findByIdAndDelete(i);
    }

    await UserList.findByIdAndUpdate(req.user.id, {
      $pull: { vlist: req.query.id },
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
