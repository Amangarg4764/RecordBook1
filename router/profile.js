const express = require("express");
const router = express.Router();
const passport = require("passport");
const VehicleList = require("../model/addVehicle");
const PersonalList = require("../model/personal");
const MonthsDetails = require("../model/monthsDetails");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");
const OtherThisList = require("../model/other");
const Userlist = require("../model/user");
const PersonalMonth = require("../model/personalMonth");
const path = require("path");
const fs = require("fs");
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

router.get(
  "/deleteUser",
  passport.checkAuthentication,
  async function (req, res) {
    let usa = await Userlist.findByIdAndDelete(req.query.id);
    for (r of usa.vlist) {
      let data = await VehicleList.findByIdAndDelete(r._id);
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
            for (q of j.image) {
              fs.unlinkSync(path.join(__dirname, "../", q));
            }
          }
        }
        let deddata = await journeyList.deleteMany({ mowner: i });

        let mdata = await MonthsDetails.findByIdAndDelete(i);
      }
    }
    for (r of usa.olist) {
      let data = await PersonalList.findById(r._id).populate("child").exec();
      for (i of data.child) {
        await OtherThisList.deleteMany({ listowner: i._id });
      }
      await PersonalMonth.deleteMany({ parent: r._id });
      await PersonalList.findByIdAndDelete(r._id);
    }
    return res.redirect("back");
  }
);

/*router.get("/api1", passport.checkAuthentication, async function (req, res) {
  let data = await Userlist.findById(req.user.id)

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
  return res.status(200).json({
    data: data,
  });
});*/
module.exports = router;
