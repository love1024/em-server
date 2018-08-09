const express = require('express')
const router = express.Router()

const Resource = require('../models/resource')
const Project = require('../models/project')
const ProjectResource = require('../models/projectResource');

let prData;
let mpData;
let reData;

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

/* GET RESOURCES BY PM ID*/
router.get('/pm/:id', (req, res, next) => {
  prData = mpData = reData = null;
  Resource.find({ resourceId: req.params.id, active: true }, { _id: 0, role: 1 }, (err, resource) => {
    let role = resource[0]["role"];
    let query;
    if (role == "manager")
      query = { projectNagarroPMId: req.params.id, active: true };
    else
      query = { active: true };
    Project.find(query, (err, projects) => {
      if (err) return next(err);
      prData = projects;
      getManagerResources(req, res, next);
    });
  })
  ProjectResource.find({ active: true }, (err, projectResources) => {
    if (err) return next(err);
    mpData = projectResources;
    getManagerResources(req, res, next);
  })
  Resource.find({ active: true }, (err, resources) => {
    if (err) return next(err);
    reData = resources;
    getManagerResources(req, res, next);
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

/** Find Resource By Manager Id */
function getManagerResources(req, res, next) {
  if (prData && mpData && reData) {
    let resultResources = [];
    for (const pr of prData) {
      const mps = mpData.filter((mp) => mp.projectId == pr.projectId);
      for (const mp of mps) {
        let re = reData.filter((re) => mp.resourceId == re.resourceId);
        let alreadyExist = resultResources.filter((curRes) => re[0].resourceId == curRes.resourceId);
        if (re.length > 0 && alreadyExist.length == 0)
          resultResources.push(re[0]);
      }
    }
    res.json(resultResources);
  }
}

module.exports = router;  