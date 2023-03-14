const express = require("express");
const router = express.Router();
const OtherThisList = require("../model/other");
const PersonalMonth = require("../model/personalMonth");
const OtherList = require("../model/otherThings");
const journeyList = require("../model/addJourney");

router.post("/addThisExpenseDetail", async function (req, res) {
  let inputdata = await OtherThisList.create({
    title: req.body.title,
    dateOfInves: req.body.dateOfInves,
    price: req.body.price,
    listowner: req.query.id,
  });
  if (req.query.key == 3) {
    let otherdata = await PersonalMonth.findById(req.query.id);
    otherdata.child.push(inputdata.id);
    otherdata.price = parseInt(req.body.price) + parseInt(otherdata.price);
    otherdata.save();
  } else if (req.query.key == 2) {
    let otherdata = await OtherList.findById(req.query.id);
    otherdata.listOfThings.push(inputdata.id);
    otherdata.totalPrice =
      parseInt(req.body.price) + parseInt(otherdata.totalPrice);
    otherdata.save();
  } else {
    let otherdata = await journeyList.findById(req.query.id);
    otherdata.expensive.push(inputdata.id);
    otherdata.profit = parseInt(otherdata.profit) - parseInt(req.body.price);
    otherdata.save();
  }
  return res.redirect("back");
});

router.get("/getThisExpenseDetail", async function (req, res) {
  // populate path of mowner and also sub populate path of vname in mowner
  if (req.query.key == 3) {
    let data = await PersonalMonth.findById(req.query.id)
      .populate("parent")
      .populate("child")
      .exec();

    return res.render("list", { key: 3, data: data });
  } else {
    let data = await OtherList.findById(req.query.id)
      .populate("listOfThings")
      .populate({ path: "mowner", populate: { path: "vname" } })
      .exec();
    return res.render("list", { key: 2, data: data });
  }
});

router.post("/updateThisExpenseDetail", async function (req, res) {
  let data = await OtherThisList.findByIdAndUpdate(req.query.id, {
    title: req.body.title,
    dateOfInves: req.body.dateOfInves,
    price: req.body.price,
  });
  if (req.query.key == 3) {
    let otherdata = await PersonalMonth.findById(data.listowner);
    otherdata.price =
      parseInt(otherdata.price) +
      parseInt(req.body.price) -
      parseInt(data.price);
    otherdata.save();
  } else if (req.query.key == 2) {
    let otherdata = await OtherList.findById(data.listowner);
    otherdata.totalPrice =
      parseInt(otherdata.totalPrice) +
      parseInt(req.body.price) -
      parseInt(data.price);
    otherdata.save();
  } else {
    let otherdata = await journeyList.findById(data.listowner);
    otherdata.profit =
      parseInt(otherdata.profit) -
      parseInt(req.body.price) +
      parseInt(data.price);
    otherdata.save();
  }
  return res.redirect("back");
});

router.get("/deleteThisExpenseDetail", async function (req, res) {
  let dedata = await OtherThisList.findByIdAndDelete(req.query.id);
  if (req.query.key == 3) {
    let odata = await PersonalMonth.findById(dedata.listowner);
    odata.price = parseInt(odata.price) - parseInt(dedata.price);
    let i = odata.child.indexOf(req.query.id);
    odata.child.splice(i, 1);
    odata.save();
  } else if (req.query.key == 2) {
    let othdata = await OtherList.findById(dedata.listowner);
    othdata.totalPrice = parseInt(othdata.totalPrice) - parseInt(dedata.price);
    let i = othdata.listOfThings.indexOf(req.query.id);
    othdata.listOfThings.splice(i, 1);
    othdata.save();
  } else {
    let othdata = await journeyList.findById(dedata.listowner);
    othdata.profit = parseInt(othdata.profit) + parseInt(dedata.price);
    let i = othdata.expensive.indexOf(req.query.id);
    othdata.expensive.splice(i, 1);
    othdata.save();
  }
  return res.redirect("back");
});

module.exports = router;
