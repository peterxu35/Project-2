const Player = require('../models/player');
const express = require('express')
const router = express.Router()

//Create
router.post('/players/:id/reviews', (req, res) => {
    Player.findById(req.params.id, function(err, player) {
        console.log(req.body)
        player.reviews.push(req.body);
        console.log(player.reviews)
        player.save(function(err) {
          res.redirect(`/players/${player._id}`);
        });
      });
})

//Delete
router.delete("/delete/:id/:reviewid", (req, res) => {
    const playerId = req.params.playerId
    Player.findByIdAndRemove(req.params.id)
        .then((player) => {
            res.redirect("/players/:id");
        })
        .catch((error) => {
            console.log(error);
        });
})


module.exports = router