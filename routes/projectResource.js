const express = require('express')
const router = express.Router()

const ProjectResource = require('../models/projectResource')
const Project = require('../models/project');


/* GET RESOURCES BY PROJECT ID */
router.get('/project/:id', (req, res, next) => {
  let query = { projectId: req.params.id };
  if (req.query.active)
    query.active = req.query.active;
  ProjectResource.find(query, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

/* GET PROJECTS BY RESOURCE ID */
router.get('/resource/:id', (req, res, next) => {
  let query = { resourceId: req.params.id };
  if (req.query.active)
    query.active = req.query.active;
  ProjectResource.find(query, (err, projects) => {
    if (err) return next(err)
    res.json(projects)
  })
})



/* SAVE PROJECT RESOURCE */
router.post('/', (req, res, next) => {
  ProjectResource.find({}, ['projectResourceId'], { limit: 1, sort: { projectResourceId: -1 } }, (err, maxId) => {
    if (!req.body.projectResourceId) {
      if (maxId.length > 0 && maxId[0].projectResourceId)
        req.body.projectResourceId = parseInt(maxId[0].projectResourceId) + 1
      else
        req.body.projectResourceId = 1;
    }
    ProjectResource.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE PROJECT RESOURCE*/
router.put('/:id', (req, res, next) => {
  ProjectResource.findOneAndUpdate({ _id: req.params.id },
    req.body, { upsert: true }, (err, resource) => {
      if (err) return next(err)
      res.json(resource)
    })
})

/* REMOVE PROJECT RESOURCE*/
router.delete('/:id', (req, res, next) => {
  ProjectResource.remove({ _id: req.params.id }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
})

module.exports = router;  