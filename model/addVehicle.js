const mongoose = require("mongoose");

const vehicleList = new mongoose.Schema(
  {
    vname: {
      type: String,
      required: true,
    },
    months: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "months_Details",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const VehicleList = mongoose.model("Vehicle_List", vehicleList);

module.exports = VehicleList;
