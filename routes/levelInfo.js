const express = require('express')
const router = express.Router()

const LevelInfo = require('../models/level_info')

/* GET ALL LEVELS */
router.get('/', (req, res, next) => {
  LevelInfo.find((err, level) => {
    if (err) return next(err)
    res.json(level)
  })
})



/* SAVE LEVEL_INFO */
router.post('/', (req, res, next) => {
  LevelInfo.find({}, ['levelId'], { limit: 1, sort: { levelId: -1 } }, (err, maxId) => {
    if (!req.body.levelId) {
      if (maxId.length > 0 && maxId[0].levelId)
        req.body.levelId = parseInt(maxId[0].levelId) + 1
      else
        req.body.levelId = 1;
    }
    LevelInfo.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE LEVEL */
router.put('/:id', (req, res, next) => {
  LevelInfo.findOneAndUpdate({ levelId: req.params.id },
    req.body, { upsert: true }, (err, level) => {
      if (err) return next(err)
      res.json(level)
    })
})

/* REMOVE LEVEL_INFO */
router.delete('/:id', (req, res, next) => {
  LevelInfo.remove({ levelId: req.params.id }, (err, level) => {
    if (err) return next(err)
    res.json(level)
  })
})

module.exports = router;  