const Excel = require('exceljs')
const express = require('express')
const router = express.Router()

const Attendance = require('../models/attendance')
const Resource = require('../models/resource')
const Project = require('../models/project')
const Mapping = require('../models/projectResource')

let workbook = new Excel.Workbook();

let atData = null;
let reData = null;
let prData = null;
let mpData = null;
let data = null;

router.get('/', (req, res, next) => {
  atData = reData = prData = mpData = data = null;
  Attendance.find({}, (err, data) => {
    if (err) return next(err);
    atData = data;
    generateExcel(req, res, next);
  })
  Resource.find({ active: true }, (err, data) => {
    if (err) return next(err);
    reData = data;
    generateExcel(req, res, next);
  })
  Project.find({ active: true }, (err, data) => {
    if (err) return next(err);
    prData = data;
    generateExcel(req, res, next);
  })
  Mapping.find({ active: true }, (err, data) => {
    if (err) return next(err);
    mpData = data;
    generateExcel(req, res, next);
  })
})

function generateExcel(req, res, next) {
  if (atData && reData && prData && mpData) {
    workbook.xlsx.readFile('./xlformat/attendance.xlsx')
      .then(() => {
        let worksheet = workbook.getWorksheet('Sheet1');
        let curRow = 2;
        for (const re of reData) {
          let ats = atData.filter(at => ((re.resourceId == at.resourceId) && !at.wfh));
          let mps = mpData.filter(mp => re.resourceId == mp.resourceId);
          mps = getMaxAllocation(mps);
          let pr = prData.filter(pr => pr.projectId == mps.projectId);
          for (const at of ats) {
            console.log(at.wfh);
            worksheet.getRow(curRow).values = getValues(re, at, pr[0]);
            curRow++;
          }
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        workbook.xlsx.write(res)
          .then(() => {
            console.log("Success generating attendance");
            res.end();
          })
      })
  }
}

function getValues(re, at, pr) {
  console.log((new Date(at.date).toLocaleDateString()))
  return [
    re.resourceName,
    pr["projectNameAsPerSow"],
    (new Date(at.date).toLocaleDateString()),
    (new Date(at.date).toLocaleDateString()),
    1,
    'Approved',
    'Puneet Verma',
    (new Date(at.approvalDate).toLocaleDateString()),
    at.remarks,
    re.location
  ]
}

function getMaxAllocation(mps) {
  let mp; al = 0;
  for (let i = 0; i < mps.length; i++) {
    if (mps[i].resourceAllocation > al) {
      mp = mps[i];
      al = mps[i].resourceAllocation;
    }
  }
  return mp;
}


module.exports = router; 
