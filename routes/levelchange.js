const express = require('express')
const router = express.Router()

const LevelChange = require('../models/level_change')

/* GET ALL RESOURCES */
router.get('/', (req, res, next) => {
  LevelChange.find((err, resources) => {
    if (err) return next(err)
    res.json(resources)
  })
})

module.exports = router;  