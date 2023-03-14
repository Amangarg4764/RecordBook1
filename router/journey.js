const express = require("express");
const router = express.Router();
const journeyList = require("../model/addJourney");
const MonthsDetails = require("../model/monthsDetails");
const OtherThisList = require("../model/other");

//CRUD operation on journey
router.post("/addJourney", async function (req, res) {
  let jdata = await journeyList.create({
    jname: req.body.title,
    arrival: req.body.arrival,
    mowner: req.query.id,
  });
  let mdata = await MonthsDetails.findById(req.query.id);
  mdata.journeys.push(jdata.id);
  mdata.save();

  return res.redirect("back");
});

router.get("/getThisJourney", async function (req, res) {
  let data = await journeyList
    .findById(req.query.id)
    .populate("expensive")
    .populate({ path: "mowner", populate: { path: "vname" } })
    .exec();

  return res.render("journey", { data: data });
});

router.post("/updateThisJourney", async function (req, res) {
  let data = await journeyList.findByIdAndUpdate(req.query.id, {
    jname: req.body.title,
    arrival: req.body.arrival,
    departure: req.body.departure,
    rate: req.body.rate,
    qtl: req.body.qtl,
    weightloss: req.body.weightloss,
    weightlossPrice: req.body.weightlossPrice,
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
});

router.get("/deleteThisJourney", async function (req, res) {
  let data = await OtherThisList.deleteMany({ listowner: req.query.id });
  let jdata = await journeyList.findByIdAndDelete(req.query.id);
  await MonthsDetails.findByIdAndUpdate(jdata.mowner, {
    $pull: { journeys: req.query.id },
  });
  return res.redirect("back");
});

module.exports = router;
