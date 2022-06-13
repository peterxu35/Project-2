const mongoose = require('./connections')

const { Schema, model } = mongoose

const playersSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    position: String,
    img: String,
    height_feet: { type: Number},
    weight_inches: {type: Number}
})

const Player = model("Player", playersSchema)

module.exports = Player 