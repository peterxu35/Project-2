const express = require("express")
const Player = require("../models/player")

const router = express.Router()

router.get("/seed", (req, res) => {
    const testPlayer = {
        firstName: "Lebron",
        lastName: "James",
        position: "F",
        img: 'https://i.imgur.com/OWcO7wP.jpg',
        height_feet: 6,
        height_inches: 8,
    }
    Player.create(testPlayer).then((data) => {
        res.json(testPlayer)
    })
})

router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/users/login");
    }
  });

// Index route
router.get("/", (req, res) => {
    res.render('players/index', {
        players: Player.find({})
    })
})

// New route
router.get("/new", (req, res) => {
    res.render("players/new")
})

// Delete route
router.delete("/:id", (req, res) => {
    Player.findByIdAndRemove(req.params.id)
        .then((player) => {
            res.redirect("/players");
        })
        .catch((error) => {
            console.log(error);
        });
})

//Update route
router.put("/:id", (req, res) => {
    Player.updateOne({_id: req.params.id}, 
        {$set: {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            img: req.body.img,
            position: req.body.position,
            height_feet: req.body.height_feet,
            height_inches: req.body.height_inches
        }})
        .then((player) => {
            res.redirect("/players");
        })
        .catch((error) => {
            console.log(error);
        });
})

//Create route
router.post('/', (req, res) => {
    Player.create(req.body)
    .then((data) => {
        res.redirect('/players')
    })
    .catch((err) => {
        console.log(err)
    })
})

//Edit Route
router.get("/:id/edit", (req, res) => {
    Player.findById(req.params.id)
    .then((player) => {
        res.render("players/edit", {
            player: player
        })
    })
})

//Show route
router.get("/:id", (req, res) => {
    Player.findById(req.params.id)
        .then((player) => {
            res.render("players/show", {
                player: player
            })
        })
        .catch((error) => {
            console.log(error);
        })
})




module.exports = router