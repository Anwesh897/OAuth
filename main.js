const express = require("express");
const authRoute = require("./routes/oauth-routes");
const passportSetup = require("./config/passport-setup");

const app = express();

///Set view engine
app.set("view engine", "ejs");

///Set up routes
app.use("/auth", authRoute);

///Create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
