const mongoose = require('./connections')

const { Schema, model } = mongoose

const playersSchema = new Schema({
    first_name: String,
    last_name: { type: String },
    position: String,
    img: String,
    height_feet: { type: Number},
    height_inches: {type: Number}
})

const Player = model("Player", playersSchema)

module.exports = Player 