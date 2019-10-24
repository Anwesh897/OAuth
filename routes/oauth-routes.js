const router = require("express").Router();
const passport = require("passport");

///OAuth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

///OAuth logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
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
  //res.send(req.user);
  res.redirect("/profile/");
});

module.exports = router;
