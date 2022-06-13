const express = require("express")
const Player = require("../models/player")

const router = express.Router()

router.get("/seed", (req, res) => {
    const testPlayer = {
        firstName: "Lebron",
        last_name: "James",
        position: "F",
        img: 'https://i.imgur.com/OWcO7wP.jpg',
        height_feet: 6,
        height_inches: 8,
    }
    Player.create(testPlayer).then((data) => {
        res.json(testPlayer)
    })
})

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