const express = require("express");
const router = express.Router();

const PersonalList = require("../model/personal");
const PersonalMonth = require("../model/personalMonth");
const OtherThisList = require("../model/other");

router.post("/addPersonal", async function (req, res) {
  await PersonalList.create({ title: req.body.title });
  return res.redirect("back");
});

router.post("/updatePersonal", async function (req, res) {
  await PersonalList.findByIdAndUpdate(req.query.id, { title: req.body.title });
  return res.redirect("back");
});

router.get("/deletePersonal", async function (req, res) {
  let data = await PersonalList.findById(req.query.id).populate("child").exec();
  for (i of data.child) {
    await OtherThisList.deleteMany({ listowner: i._id });
  }
  await PersonalMonth.deleteMany({ parent: req.query.id });
  await PersonalList.findByIdAndDelete(req.query.id);
  return res.redirect("back");
});

module.exports = router;
