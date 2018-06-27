const express = require('express')
const router = express.Router()

const Attendance = require('../models/attendance')

/* GET ALL ATTENDANCE */
router.get('/', (req, res, next) => {
  Attendance.find((err, attendance) => {
    if (err) return next(err)
    res.json(attendance)
  })
})

/* GET ATTENDANCE BY ID */
router.get('/:id', (req, res, next) => {
  Attendance.find({ attendanceId: req.params.id }, (err, attendance) => {
    if (err) return next(err)
    res.json(attendance)
  })
})

/* SAVE ATTENDANCE */
router.post('/', (req, res, next) => {
  Attendance.find({}, ['attendanceId'], { limit: 1, sort: { attendanceId: -1 } }, (err, maxId) => {
    if (maxId.length > 0 && maxId[0].attendanceId)
      req.body.attendanceId = parseInt(maxId[0].attendanceId) + 1
    else
      req.body.attendanceId = 1;
    Attendance.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE ATTENDANCE */
router.put('/:id', (req, res, next) => {
  Attendance.findOneAndUpdate({ attendanceId: req.params.id },
    req.body, { upsert: true }, (err, attendance) => {
      if (err) return next(err)
      res.json(attendance)
    })
})

/* REMOVE ATTENDANCE */
router.delete('/:id', (req, res, next) => {
  Attendance.remove({ attendanceId: req.params.id }, (err, attendance) => {
    if (err) return next(err)
    res.json(attendance)
  })
})

module.exports = router;  