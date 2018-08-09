const express = require('express')
const router = express.Router()

const Project = require('../models/project')
const Resource = require('../models/resource')

/* GET ALL PROJECT */
router.get('/', (req, res, next) => {
  const query = req.query.active ? { 'active': req.query.active } : {};
  Project.find(query, (err, projects) => {
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

/* GET PROJECT BY ID */
router.get('/pm/:id', (req, res, next) => {
  Resource.find({ resourceId: req.params.id, active: true }, { _id: 0, role: 1 }, (err, resource) => {
    let role = resource[0]["role"];
    let query;
    if (role == "manager")
      query = { projectNagarroPMId: req.params.id, active: true };
    else
      query = { active: true };
    Project.find(query, (err, projects) => {
      if (err) return next(err)
      res.json(projects)
    })
  })

})

/* GET PROJECT BY DEPARTMENT ID */
router.get('/department/:id', (req, res, next) => {
  Project.find({ departmentId: req.params.id, active: true }, (err, projects) => {
    if (err) return next(err)
    res.json(projects)
  })
})

/* SAVE PROJECT */
router.post('/', (req, res, next) => {
  Project.find({}, ['projectId'], { limit: 1, sort: { projectId: -1 } }, (err, maxId) => {
    if (!req.body.projectId) {
      if (maxId.length > 0 && maxId[0].projectId)
        req.body.projectId = parseInt(maxId[0].projectId) + 1
      else
        req.body.projectId = 1;
    }
    Project.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE PROJECT */
router.put('/:id', (req, res, next) => {
  Project.findOneAndUpdate({ _id: req.params.id },
    req.body, { upsert: true }, (err, project) => {
      if (err) return next(err)
      res.json(project)
    })
})

/* REMOVE PROJECT */
router.delete('/:id', (req, res, next) => {
  Project.remove({ _id: req.params.id }, (err, project) => {
    if (err) return next(err)
    res.json(project)
  })
})

module.exports = router;  