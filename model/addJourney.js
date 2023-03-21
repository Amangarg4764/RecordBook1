const mongoose = require("mongoose");

const journeyDetail = new mongoose.Schema(
  {
    jname: {
      type: String,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    departure: {
      type: String,
      default: "DD/MM/YYYY",
    },
    rate: {
      type: String,
      default: "0",
    },
    qtl: {
      type: String,
      default: "0",
    },
    weightloss: {
      type: String,
      default: "0",
    },
    weightlossPrice: {
      type: String,
      default: "0",
    },
    expensive: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "other",
      },
    ],
    mowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "months_Details",
    },
    profit: {
      type: Number,
      default: 0,
    },
    image: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const journeyDet = mongoose.model("journeyDetails", journeyDetail);

module.exports = journeyDet;
