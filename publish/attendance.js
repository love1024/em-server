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
          let ats = atData.filter(at => re.resourceId == at.resourceId);
          for (const at of ats) {
            worksheet.getRow(curRow).values = getValues(re, at);
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

function getValues(re, at) {
  return [
    re.resourceName,
    'Realpay',
    new Date(at.date),
    at.date,
    1,
    'Approved',
    'Puneet Verma',
    at.approvalDate,
    at.remarks,
    re.location
  ]
}


module.exports = router; 
