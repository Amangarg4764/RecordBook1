const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/RecordBook"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in database"));

db.once("open", function () {
  console.log("Sucessful connect to data base");
});
