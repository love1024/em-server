const express = require('express')
const router = express.Router()

const ResourceData = require('../models/resourceperiodic')

/* GET RESOURCE DATA BY ID */
router.get('/:id', (req, res, next) => {
  ResourceData.find({ resourceId: req.params.id }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

/* UPATE RESOURCE DATA BY ID*/
router.put('/:id', (req, res, next) => {
  ResourceData.findOneAndUpdate({ resourceId: req.params.id },
    req.body, { upsert: true }, (err, resource) => {
      if (err) return next(err)
      res.json(resource)
    })
})


module.exports = router;  