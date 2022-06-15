////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const Player = require("../models/player")
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", async (req, res) => {
  // encrpt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  //   create user
  User.create(req.body)
    .then((user) => {
      // redirect to login page
      res.redirect("/user/login");
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login.liquid");
});

router.post("/login", (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;

  // search for the user
  Users.findOne({ username: username })
      .then(async (user) => {
          // checking if the user exists
          if (user) {
              // compare password
              const result = await bcrypt.compare(password, user.password)
              if (result) {
                  // store properties in the session
                  req.session.username = username
                  req.session.loggedIn = true

                  // redirect to users account page
                  res.redirect(`/users/${user._id}/account`)
              }
              else {
                  res.json({ error: "password doesen't match" })
              }
          }
          else {
              res.json({ error: "user doesen't exist" })
          }
      })
      .catch((error) => {
          console.log(error)
          res.json({ error })
      })
})



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;