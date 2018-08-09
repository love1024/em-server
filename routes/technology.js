const express = require('express')
const router = express.Router()

const Technology = require('../models/technology')

/* GET ALL TECHNOLOGIES */
router.get('/', (req, res, next) => {
  Technology.find((err, technology) => {
    if (err) return next(err)
    res.json(technology)
  })
})

/* GET TECHNOLOGY BY ID */
router.get('/:id', (req, res, next) => {
  Technology.find({ technologyId: req.params.id }, (err, technology) => {
    if (err) return next(err)
    res.json(technology)
  })
})

/* SAVE TECHNOLOGY */
router.post('/', (req, res, next) => {
  Technology.find({}, ['technologyId'], { limit: 1, sort: { technologyId: -1 } }, (err, maxId) => {
    if (maxId.length > 0 && maxId[0].technologyId)
      req.body.technologyId = parseInt(maxId[0].technologyId) + 1
    else
      req.body.technologyId = 1;
    Technology.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE Technology */
router.put('/:id', (req, res, next) => {
  Technology.findOneAndUpdate({ technologyId: req.params.id },
    req.body, { upsert: true }, (err, technology) => {
      if (err) return next(err)
      res.json(technology)
    })
})

/* REMOVE Technology */
router.delete('/:id', (req, res, next) => {
  Technology.remove({ technologyId: req.params.id }, (err, technology) => {
    if (err) return next(err)
    res.json(technology)
  })
})

module.exports = router;  