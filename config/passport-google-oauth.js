const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../model/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        process.env.GOOGLE_ID ||
        "324409582740-1vnl2bll0485m29c6tbf3oca1aamo8le.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_SECRET || "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",
      callbackURL:
        process.env.GOOGLE_CALLBACK ||
        "http://localhost:8000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google oauth");
          return;
        }
        //console.log(accessToken,refreshToken);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, data) {
              if (err) {
                console.log("error in adding data using google oauth");
                return;
              }
              return done(null, data);
            }
          );
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //de
  User.findById(id, function (err, user) {
    if (err) {
      console.log("err");
      return;
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
