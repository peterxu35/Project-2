const Player = require('../models/player');
const express = require('express')
const router = express.Router


//Edit Route
router.get("/:id/edit", (req, res) => {
    Player.findById(req.params.id)
    .then((player) => {
        res.render("reviews/edit", {
            reviews
        })
    })
})

//Create
router.post('/players/:id/reviews', (req, res) => {
    Player.findById(req.params.id, function(err, player) {
        player.reviews.push(req.body);
        player.save(function(err) {
          res.redirect(`/players/${player._id}`);
        });
      });
})