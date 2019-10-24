const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const dotenv = require("dotenv");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      ///Options for strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      ///Check if user already exist
      User.findOne({ googleId: profile.id }).then(currentuser => {
        if (currentuser) {
          ///already have a user
          console.log(`User is ${currentuser}`);
          done(null, currentuser);
        } else {
          ///if not create user
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail:profile._json.picture
          })
            .save()
            .then(newUser => {
              console.log(`new user created ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);
