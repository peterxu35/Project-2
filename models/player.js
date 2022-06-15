const mongoose = require('./connections')

const { Schema, model } = mongoose

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
  }, {
    timestamps: true
  });

const playersSchema = new Schema({
    firstName: String,
    lastName: { type: String },
    position: String,
    img: String,
    height_feet: { type: Number},
    height_inches: {type: Number},
    reviews: [reviewSchema],
    teams: [String]
})

const Player = model("Player", playersSchema)

module.exports = Player 