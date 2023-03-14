const express = require("express");
const port = process.env.PORT || 8000;
const path = require("path");
const cookieParse = require("cookie-parser");
const passport = require("passport");
const googleStrategy = require("./config/passport-google-oauth");

const database = require("./config/mongoose");
const Mongostore = require("connect-mongo");
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "sitesPages"));
app.use("/assest", express.static(path.join(__dirname, "assests")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(
  session({
    name: "login",
    secret: process.env.SESSION_SECRET || "xyz",
    saveUninitialized: false,
    resave: false,
    //max age is 1 day = 1000 * 60 * 60 *24
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: Mongostore.create({
      mongoUrl:
        process.env.MONGODB_URL || "mongodb://localhost:27017/RecordBook",
      mongooseConnect: database,
      autoRemove: "disable",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//------------Login page----------------------------------------------------------------------------------
//link on google button give

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//get ans from google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    return res.redirect("/home");
  }
);
//if it true than go to home page or not then go to login page
app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return res.render("login");
});

app.get("/logout", async function (req, res) {
  await req.logout(req.user, function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

//-----------------------------------------------------------------------------------------------------------
app.use("/", require("./router/index"));
app.listen(port, function (err) {
  if (err) {
    console.log("Error in starting the server :", err);
    return;
  }
  console.log("Server is started and running on port :", port);
});
