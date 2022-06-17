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
  res.render("user/signup.liquid", {
    login: req.session.loggedIn,
    username: req.session.username,
  });
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

router.post("/login", async (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      // check if user exists
      if (user) {
        // compare password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // store some properties in the session object
          req.session.username = username;
          req.session.userId = user._id;
          req.session.loggedIn = true;
          // redirect to fruits page if successful
          res.redirect("/players");
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" });
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

// logout route
router.get("/logout", (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

  // // search for the user
  // User.findOne({ username })
  //     .then(async (user) => {
  //         // checking if the user exists
  //         if (user) {
  //             // compare password
  //             const result = await bcrypt.compare(password, user.password)
  //             if (result) {
  //                 // store properties in the session
  //                 req.session.username = username
  //                 req.session.loggedIn = true

  //                 // redirect to users account page
  //                 res.redirect(`/users/${user._id}/account`)
  //             }
  //             else {
  //                 res.json({ error: "password doesen't match" })
  //             }
  //         }
  //         else {
  //             res.json({ error: "user doesen't exist" })
  //         }
  //     })
  //     .catch((error) => {
  //         console.log(error)
  //         res.json({ error })
  //     })




//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;