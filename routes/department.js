const express = require('express')
const router = express.Router()

const Department = require('../models/department')

/* GET ALL DEPARTMENTS */
router.get('/', (req, res, next) => {
  const query = req.query.active ? { 'active': req.query.active } : {};
  Department.find(query, (err, departments) => {
    if (err) return next(err)
    res.json(departments)
  })
})

/* GET DEPARTMENTS BY ID */
router.get('/:id', (req, res, next) => {
  Department.find({ departmentId: req.params.id }, (err, department) => {
    if (err) return next(err)
    res.json(department)
  })
})

/* SAVE DEPARTMENT */
router.post('/', (req, res, next) => {
  Department.find({}, ['departmentId'], { limit: 1, sort: { departmentId: -1 } }, (err, maxId) => {
    if (!req.body.departmentId) {
      if (maxId.length > 0 && maxId[0].departmentId)
        req.body.departmentId = parseInt(maxId[0].departmentId) + 1
      else
        req.body.departmentId = 1;
    }
    Department.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE DEPARTMENT */
router.put('/:id', (req, res, next) => {
  Department.findOneAndUpdate({ _id: req.params.id },
    req.body, { upsert: true }, (err, department) => {
      if (err) return next(err)
      res.json(department)
    })
})

/* REMOVE DEPARTMENT */
router.delete('/:id', (req, res, next) => {
  Department.remove({ _id: req.params.id }, (err, department) => {
    if (err) return next(err)
    res.json(department)
  })
})

module.exports = router;  