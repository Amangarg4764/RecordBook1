const express = require("express");
const router = express.Router();
const journeyList = require("../model/addJourney");
const MonthsDetails = require("../model/monthsDetails");
const OtherThisList = require("../model/other");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//add upload image folder
const Stroage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.id +
        "-" +
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({ storage: Stroage });

//CRUD operation on journey
router.post(
  "/addJourney",
  passport.checkAuthentication,
  async function (req, res) {
    let jdata = await journeyList.create({
      jname: req.body.title,
      arrival: req.body.arrival,
      mowner: req.query.id,
    });
    let mdata = await MonthsDetails.findById(req.query.id);
    mdata.journeys.push(jdata.id);
    mdata.save();

    return res.redirect("back");
  }
);

router.get(
  "/getThisJourney",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await journeyList
      .findById(req.query.id)
      .populate("expensive")
      .populate({ path: "mowner", populate: { path: "vname" } })
      .exec();

    return res.render("journey", { data: data });
  }
);

router.post(
  "/updateThisJourney",
  passport.checkAuthentication,
  upload.single("image"),
  async function (req, res) {
    let prevdata = await journeyList.findById(req.query.id);
    let destImage = prevdata.image;
    if (req.file != undefined) {
      if (destImage != undefined) {
        fs.unlinkSync(path.join(__dirname, "../", destImage));
      }
      destImage = req.file.path;
    }

    let data = await journeyList.findByIdAndUpdate(req.query.id, {
      jname: req.body.title,
      arrival: req.body.arrival,
      departure: req.body.departure,
      rate: req.body.rate,
      qtl: req.body.qtl,
      weightloss: req.body.weightloss,
      weightlossPrice: req.body.weightlossPrice,
      image: destImage,
    });
    let oans =
      parseFloat(data.qtl) * parseFloat(data.rate) -
      parseFloat(data.weightloss) * parseFloat(data.weightlossPrice);
    let nans =
      parseFloat(req.body.qtl) * parseFloat(req.body.rate) -
      parseFloat(req.body.weightloss) * parseFloat(req.body.weightlossPrice);
    data.profit = parseInt(data.profit) + nans - oans;
    data.save();
    return res.redirect("back");
  }
);

router.get(
  "/deleteThisJourney",
  passport.checkAuthentication,
  async function (req, res) {
    let data = await OtherThisList.deleteMany({ listowner: req.query.id });
    let jdata = await journeyList.findByIdAndDelete(req.query.id);
    if (jdata.image) {
      fs.unlinkSync(path.join(__dirname, "../", jdata.image));
    }
    await MonthsDetails.findByIdAndUpdate(jdata.mowner, {
      $pull: { journeys: req.query.id },
    });
    return res.redirect("back");
  }
);

module.exports = router;
