const mongoose = require("mongoose");

const monthsDetails = new mongoose.Schema(
  {
    mname: {
      type: String,
      required: true,
    },
    journeys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "journeyDetails",
      },
    ],
    vname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle_List",
    },
    otherExp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Other_List",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const monthDetails = mongoose.model("months_Details", monthsDetails);

module.exports = monthDetails;
