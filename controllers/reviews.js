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

//Update route
router.put("/:id/reviews", (req, res) => {
    Player.updateOne({_id: req.params.id}, 
        {$set: {
            content: req.body.content, 
            rating: req.body.rating, 
        }})
        .then((player) => {
            res.redirect("/players/:id");
        })
        .catch((error) => {
            console.log(error);
        });
})

// Delete route
router.delete("/:id", (req, res) => {
    Player.findByIdAndRemove(req.params.id)
        .then((player) => {
            res.redirect("/players/:id");
        })
        .catch((error) => {
            console.log(error);
        });
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