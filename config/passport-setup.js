const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const dotenv = require("dotenv");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      ///Options for strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      ///Check if user already exist
      User.findOne({ googleId: profile.id }).then(currentuser => {
        if (currentuser) {
          ///already have a user
          console.log(`User is ${currentuser}`);
        } else {
          ///if not create user
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log(`new user created ${newUser}`);
            });
        }
      });
    }
  )
);
