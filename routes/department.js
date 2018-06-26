const express = require('express')
const router = express.Router()

const Department = require('../models/department')

/* GET ALL DEPARTMENTS */
router.get('/', (req, res, next) => {
  Department.find((err, departments) => {
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
  Department.create(req.body, (err, post) => {
    if (err) return next(err)
    res.json(post)
  })
})

/* UPATE DEPARTMENT */
router.put('/:id', (req, res, next) => {
  Department.findOneAndUpdate({ departmentId: req.params.id },
    req.body, { upsert: true }, (err, department) => {
      if (err) return next(err)
      res.json(department)
    })
})

/* REMOVE DEPARTMENT */
router.delete('/:id', (req, res, next) => {
  Department.remove({ departmentId: req.params.id }, (err, department) => {
    if (err) return next(err)
    res.json(department)
  })
})

module.exports = router;  