const express = require('express')
const router = express.Router()

const Attendance = require('../models/attendance')
const Resource = require('../models/resource')
const Project = require('../models/project')
const Mapping = require('../models/projectResource')
let atData;
let reData;
let prData;
let mpData;

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

/* GET ATTENDANCE BY PM ID */
router.get('/pm/:id', (req, res, next) => {
  atData = reData = prData = mpData = data = null;
  Resource.find({ resourceId: req.params.id, active: true }, { _id: 0, role: 1 }, (err, resource) => {
    let role = resource[0]["role"];
    let query;
    if (role == "manager")
      query = { projectNagarroPMId: req.params.id, active: true };
    else
      query = { active: true };
    Project.find(query, (err, data) => {
      if (err) return next(err);
      prData = data;
      getManagerResourcesAttendance(req, res, next);
    })
  })
  Attendance.find({}, (err, data) => {
    if (err) return next(err);
    atData = data;
    getManagerResourcesAttendance(req, res, next);
  })
  Resource.find({ active: true }, (err, data) => {
    if (err) return next(err);
    reData = data;
    getManagerResourcesAttendance(req, res, next);
  })
  Mapping.find({ active: true }, (err, data) => {
    if (err) return next(err);
    mpData = data;
    getManagerResourcesAttendance(req, res, next);
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

/** Find Resource By Manager Id */
function getManagerResourcesAttendance(req, res, next) {
  if (prData && mpData && reData && atData) {
    let resultAttendance = [];
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
    for (const re of resultResources) {
      const ats = atData.filter((at) => at.resourceId == re.resourceId);
      for (const at of ats) {
        resultAttendance.push(at);
      }
    }
    res.json(resultAttendance);
  }
}


module.exports = router;  