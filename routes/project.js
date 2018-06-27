const express = require('express')
const router = express.Router()

const Project = require('../models/project')

/* GET ALL PROJECT */
router.get('/', (req, res, next) => {
  Project.find((err, projects) => {
    if (err) return next(err)
    res.json(projects)
  })
})

/* GET PROJECT BY ID */
router.get('/:id', (req, res, next) => {
  Project.find({ projectId: req.params.id }, (err, projects) => {
    if (err) return next(err)
    res.json(projects)
  })
})

/* SAVE PROJECT */
router.post('/', (req, res, next) => {
  Project.find({}, ['projectId'], { limit: 1, sort: { projectId: -1 } }, (err, maxId) => {
    if (maxId.length > 0 && maxId[0].projectId)
      req.body.projectId = parseInt(maxId[0].projectId) + 1
    else
      req.body.projectId = 1;
    Project.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE PROJECT */
router.put('/:id', (req, res, next) => {
  Project.findOneAndUpdate({ projectId: req.params.id },
    req.body, { upsert: true }, (err, project) => {
      if (err) return next(err)
      res.json(department)
    })
})

/* REMOVE PROJECT */
router.delete('/:id', (req, res, next) => {
  Project.remove({ projectId: req.params.id }, (err, project) => {
    if (err) return next(err)
    res.json(project)
  })
})

module.exports = router;  