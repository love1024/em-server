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
let startDate = null;
let endDate = null;
let resourceName = null;

router.get('/:id', (req, res, next) => {
  atData = reData = prData = mpData = data = resourceName = null;
  startDate = new Date(parseInt(req.query.start, 10));
  endDate = new Date(parseInt(req.query.end, 10));
  Resource.find({ resourceId: req.params.id, active: true }, { _id: 0, role: 1, resourceName: 1 }, (err, resource) => {
    let role = resource[0]["role"];
    resourceName = resource[0]["resourceName"];
    let query;
    if (role == "manager")
      query = { projectNagarroPMId: req.params.id, active: true };
    else
      query = { active: true };
    Project.find(query, (err, data) => {
      if (err) return next(err);
      prData = data;
      generateExcel(req, res, next);
    })
  })
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
        let resultResources = [];
        for (const pr of prData) {
          const mps = mpData.filter((mp) => mp.projectId == pr.projectId);
          for (const mp of mps) {
            let re = reData.filter((re) => mp.resourceId == re.resourceId);
            let alreadyExist = resultResources.filter((curRes) => re[0].resourceId == curRes.re.resourceId);
            if (re.length > 0 && alreadyExist.length == 0)
              resultResources.push({ re: re[0], pr: pr });
          }
        }
        for (const re of resultResources) {
          const ats = atData.filter((at) => (at.resourceId == re.re.resourceId) && (!at.wfh));
          for (const at of ats) {
            if (at.date >= startDate && at.date <= endDate) {
              worksheet.getRow(curRow).values = getValues(re.re, at, re.pr);
              curRow++;
            }
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
  return [
    re.resourceName,
    pr["projectNameAsPerSow"],
    (new Date(at.date).toLocaleDateString()),
    (new Date(at.date).toLocaleDateString()),
    1,
    'Approved',
    resourceName,
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
