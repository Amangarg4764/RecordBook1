const express = require("express");
const port = process.env.PORT || 8000;
const path = require("path");

const database = require("./config/mongoose");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "sitesPages"));
app.use("/assest", express.static(path.join(__dirname, "assests")));
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./router/index"));

//------------Login page----------------------------------------------------------------------------------

app.get("/", async function (req, res) {
  return res.render("login");
});
//-----------------------------------------------------------------------------------------------------------

app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server :", err);
    return;
  }
  console.log("Server is started and running on port :", port);
});
