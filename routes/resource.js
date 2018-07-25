const express = require('express')
const router = express.Router()

const Resource = require('../models/resource')

/* GET ALL RESOURCES */
router.get('/', (req, res, next) => {
  const query = req.query.active ? { 'active': req.query.active } : {};
  Resource.find(query, (err, resources) => {
    if (err) return next(err)
    res.json(resources)
  })
})

/* GET RESOURCE BY ID */
router.get('/:id', (req, res, next) => {
  const query = req.query.active ? { 'active': req.query.active } : {};
  query.resourceId = req.params.id;
  Resource.find(query, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

/* SAVE RESOURCE */
router.post('/', (req, res, next) => {
  Resource.create(req.body, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})


/* UPATE RESOURCE */
router.put('/:id', (req, res, next) => {
  Resource.findOneAndUpdate({ _id: req.params.id },
    req.body, { upsert: true }, (err, resource) => {
      if (err) return next(err)
      res.json(resource)
    })
})

/* REMOVE RESOURCE */
router.delete('/:id', (req, res, next) => {
  Resource.remove({ _id: req.params.id }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

module.exports = router;  