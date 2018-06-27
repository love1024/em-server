const express = require('express')
const router = express.Router()

const LevelChange = require('../models/level_change')

/* GET ALL LEVELS */
router.get('/', (req, res, next) => {
  LevelChange.find((err, resources) => {
    if (err) return next(err)
    res.json(resources)
  })
})

/* ADD NEW LEVEL */
router.post('/', (req, res, next) => {
  LevelChange.create(req.body, (err, post) => {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router;  