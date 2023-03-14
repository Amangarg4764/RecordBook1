const mongoose = require("mongoose");

const personalList = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    child: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personal_Month",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserList",
    },
  },
  {
    timestamps: true,
  }
);

const PersonalList = mongoose.model("Personal_List", personalList);

module.exports = PersonalList;
