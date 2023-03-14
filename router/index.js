const express = require("express");
const router = express.Router();

//CRUD operation on particular other for all three i.e vehical.month.journey.other, vehical.month.vother.other , other.month.pother.other
router.use("/", require("./other"));

//CRUD operation on particular other expencise of months
router.use("/", require("./vother"));

//CRUD operation on journey
router.use("/", require("./journey"));

//CRUD operation on vehical month
router.use("/", require("./vmonth"));

//CRUD operation on vehical
router.use("/", require("./vehical"));
//-------------------------------------------------------------------------------------------------------------------------------

//CRUD operation on personal other
router.use("/", require("./pother"));

//CRUD operation on personal month
router.use("/", require("./omonth"));

module.exports = router;
