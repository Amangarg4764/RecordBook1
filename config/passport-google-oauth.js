const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../model/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "324409582740-1vnl2bll0485m29c6tbf3oca1aamo8le.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://recordbook-itha.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      } else {
        let data = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });
        return done(null, data);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  //de
  let user = await User.findById(id);
  return done(null, user);
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
