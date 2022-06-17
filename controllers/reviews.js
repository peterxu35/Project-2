const Player = require('../models/player');
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

//Create
router.post('/players/:id/reviews', (req, res) => {
    Player.findById(req.params.id, function(err, player) {
        player.reviews.push(req.body);
        player.save(function(err) {
            if (err) {
                console.log(err)
                return
            } 
          res.redirect(`/players/${player._id}`);
        });
      });
})

//Delete
router.delete("/players/:id/review/:reviewid", (req, res) => {
    const playerId = req.params.id
    const reviewId = req.params.reviewid
    console.log("RES", res)
    console.log("reviewID", reviewId, typeof reviewId)
    Player.findById(playerId)
        .then((players) => {
            console.log("players", players)
            const theReviews = players.reviews.id(reviewId)
            theReviews.remove()
            return players.save()
        })
        .then(players => {
            res.redirect(`/players/${players.id}`)
        })
        .catch((error) => {
            console.log(error);
        })
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

module.exports = router