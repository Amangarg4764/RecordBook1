const mongoose = require("mongoose");

const Otherr = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dateOfInves: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    listowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Other_List",
    },
  },
  {
    timestamps: true,
  }
);

const OtherThis = mongoose.model("other", Otherr);

module.exports = OtherThis;
