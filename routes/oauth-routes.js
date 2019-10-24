const router = require("express").Router();
const passport = require("passport");

///OAuth login
router.get("/login", (req, res) => {
  res.render("login");
});

///OAuth logout
router.get("/logout", (req, res) => {
  res.send("logging out");
});

///OAuth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

///callback route for googel ro redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You reached a call back URI");
});

module.exports = router;
