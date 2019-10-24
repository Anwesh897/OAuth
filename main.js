const express = require("express");
const authRoute = require("./routes/oauth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

///Set view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: "7200000ms",
    keys: [keys.session.cookieKey]
  })
);

///initialize passport
app.use(passport.initialize());
app.use(passport.session());

///connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connect to mongodb");
});

///Set up routes
app.use("/auth", authRoute);
app.use("/profile", profileRoutes);

///Create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
