const express = require("express")
const Player = require("../models/player")

const router = express.Router()

router.get("/seed", (req, res) => {
    const testPlayer = {
        first_name: "Lebron",
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


router.use((req, res, next) => {
    res.send('Connected')
  });

module.exports = router