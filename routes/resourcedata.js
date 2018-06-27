const express = require('express')
const router = express.Router()

const ResourceData = require('../models/resourcedata')

/* GET RESOURCE DATA BY ID */
router.get('/:id', (req, res, next) => {
  ResourceData.find({ resourceId: req.params.id }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

/* SAVE RESOURCE DATA*/
router.post('/:id', (req, res, next) => {
  ResourceData.find({}, ['resourceId'], { limit: 1, sort: { resourceId: -1 } }, (err, maxId) => {
    if (maxId.length > 0 && maxId[0].resourceId)
      req.body.resourceId = parseInt(maxId[0].resourceId) + 1
    else
      req.body.resourceId = 1;
    ResourceData.create(req.body, (err, resource) => {
      if (err) return next(err)
      res.json(resource)
    })
  })
})


/* UPATE RESOURCE DATA*/
router.put('/:id', (req, res, next) => {
  ResourceData.findOneAndUpdate({ resourceId: req.params.id },
    req.body, { upsert: true }, (err, resource) => {
      if (err) return next(err)
      res.json(resource)
    })
})

/* REMOVE RESOURCE DATA*/
router.delete('/:id', (req, res, next) => {
  ResourceData.remove({ resourceId: req.params.id }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

module.exports = router;  