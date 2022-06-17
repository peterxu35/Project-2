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
router.put("/players/:id/review/:reviewid", (req, res) => {
    const playerId = req.params.id
    const reviewId = req.params.reviewid
    Player.findById(playerId)
    .then((players) => {
        console.log("players", players)
        const theReviews = players.reviews.id(reviewId)
        if (String(theReviews._id) === req.params.reviewid){
            theReviews.content = req.body.content
            theReviews.rating = req.body.rating
            return user.save()
        }
        else {
            return
        }
    })
    .then(players => {
        res.redirect(`/players/${players.id}`)
    })
})


//Edit Route
router.get("/players/:id/review/:reviewid", (req, res) => {
    const playerId = req.params.id
    const reviewId = req.params.reviewid
    Player.findById(playerId)
        .then((players) => {
            const theReviews = players.reviews.id(reviewId)
            if (String(theReviews._id) === req.params.reviewid){
                res.render("reviews/edit", {

                })
            }
            else {
                return
            }
        })
    })

module.exports = router