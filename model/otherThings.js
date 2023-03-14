const mongoose = require("mongoose");

const otherList = new mongoose.Schema(
  {
    oname: {
      type: String,
      required: true,
    },
    mowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "months_Details",
    },
    listOfThings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "other",
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const OtherList = mongoose.model("Other_List", otherList);

module.exports = OtherList;
