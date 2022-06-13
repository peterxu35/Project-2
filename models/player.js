const mongoose = require('./connections')

const { Schema, model } = mongoose

const playersSchema = new Schema({
    name: { type: String, required: true},
    position: String,
    img: String,
    height: { type: Number},
    weight: {type: Number}
})

const Player = model("Player", playersSchema)

module.exports = Player 