const express = require("express")
const Player = require("../models/player")

const router = express.Router()

router.use((req, res, next) => {
    res.send('Connected')
  });

module.exports = router