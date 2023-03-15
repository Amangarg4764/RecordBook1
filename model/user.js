const mongoose = require("mongoose");

const userList = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    vlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle_List",
      },
    ],
    olist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personal_List",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserList", userList);

module.exports = User;
