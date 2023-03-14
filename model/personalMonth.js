const mongoose = require("mongoose");

const personalMonth = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    child: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "other",
      },
    ],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personal_List",
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PersonalMonth = mongoose.model("Personal_Month", personalMonth);

module.exports = PersonalMonth;
