const Excel = require('exceljs')
const express = require('express')
const router = express.Router()

const codes = require('./config').attendance;

const Resource = require('../models/resource');
const Attendance = require('../models/attendance');

let reData;
let data;

router.post('/', (req, res, next) => {
  data = req.body;
  reData = null;
  Resource.find({ active: true }, (err, resources) => {
    if (err) return next(err);
    reData = resources;
    runAttendanceJob(res, res, next);
  })
})

function runAttendanceJob(req, res, next) {
  Attendance.find({}, ['attendanceId'], { limit: 1, sort: { attendanceId: -1 } }, (err, maxId) => {
    let mxId;
    if (maxId.length > 0 && maxId[0].attendanceId)
      mxId = parseInt(maxId[0].attendanceId) + 1;
    else
      mxId = 1;
    let attendanceData = [];
    for (const row of data) {
      let username = row[4];
      let resource = reData.filter((re) => re.username == username);
      if (resource.length == 0)
        continue;
      let attendance = getAttendance(mxId, row, resource[0]);
      attendanceData.push(attendance);
      mxId++;
    }
    Attendance.insertMany(attendanceData, (err, post) => {
      if (err) return next(err)
      console.log("Attendance Job completed");
      res.send({ "res": "Sucess" });
    })
  })
}

function getAttendance(id, row, re) {
  let key = row[0].split("-")[1];
  let types = codes[key].split(" ");
  return {
    attendanceId: id,
    resourceId: re.resourceId,
    approvalDate: new Date(row[3]),
    taskId: -1,
    date: new Date(row[3]),
    hours: row[2],
    attendanceType: types[0],
    presentType: (types[0] == "present" ? types[1] : ''),
    leaveType: (types[0] == 'leave' ? types[1] : ''),
    holidayType: (types[0] == 'holiday' ? types[1] : ''),
    wfh: (types.length > 2 ? true : false),
    clientApprovalDate: new Date(row[3]),
    remarks: 'Personal',
    fipUser: 'Test',
    fipProg: 'Angular',
    fipTst: Date.now(),
  }
}


module.exports = router; 
