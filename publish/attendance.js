const xl = require('excel4node')
const express = require('express')
const router = express.Router()

const Attendance = require('../models/attendance')
const Resource = require('../models/resource')

const wb = new xl.Workbook()
const ws = wb.addWorksheet("WFH")

//Columns of WFH
const cols = [
  { id: "resourceName", name: 'Project Team Members' },
  { id: "projectName", name: 'Project', value: 'Realpay' },
  { id: "date", name: 'Start Date' },
  { id: "date", name: 'End Date' },
  { id: "duration", name: 'Duration', value: "1" },
  { id: "approved", name: 'Status', value: 'Approved' },
  { id: "fipUser", name: 'Decision Maker' },
  { id: "approvalDate", name: 'Decision Date' },
  { id: "remarks", name: 'Reason for WFH' },
  { id: "presentType", name: 'Location' }
];

router.get('/', (req, res, next) => {
  const file = createFile(res, next);
})

function createFile(res, next) {
  createHeader();
  createBody(res, next);
}

function createBody(res, next) {
  findAllResources(next, (resources) => {
    let rowNo = 2;
    for (let i = 0; i < resources.length; i++) {
      const query = { resourceId: resources[i].resourceId, wfh: true };
      findAttendanceByQuery(next, query, (attendance) => {
        for (let j = 0; j < attendance.length; j++) {
          ws.cell(rowNo, 1).string(resources[i].resourceName);
          console.log(resources[i].resourceName);
          for (let k = 1; k < cols.length; k++) {
            let result = attendance[j][cols[k].id] ? attendance[j][cols[k].id] : cols[k].value;
            if (typeof result == "object")
              ws.cell(rowNo, k + 1).date(result).style({ alignment: { horizontal: 'left' } });
            else if (typeof result == "string")
              ws.cell(rowNo, k + 1).string(result).style({ alignment: { horizontal: 'left' } });
          }
          rowNo++;
        }
        if (i == resources.length - 1)
          wb.write("attendance.xlsx", res);
      })
    }
  })
}


function findAttendanceByQuery(next, query, cb) {
  Attendance.find(query, (err, attendance) => {
    if (err) return next(err)
    // console.log("ATTENDANCE " + query.resourceId, attendance);
    cb(attendance);
  })
}

function findAllResources(next, cb) {
  Resource.find({ active: true }, (err, resources) => {
    if (err) return next(err)
    // console.log("RESOURCES", resources);
    cb(resources);
  })
}

function createHeader() {
  const headerStyle = getHeaderStyle(wb)
  ws.row(1).setHeight(30);
  for (let i = 1; i <= cols.length; i++) {
    ws.cell(1, i).string(cols[i - 1].name).style(headerStyle);
    ws.column(i).setWidth(cols[i - 1].name.length + 6);
  }
}

function getHeaderStyle() {
  return wb.createStyle({
    font: {
      color: "#ffffff",
      size: 12,
      bold: true
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: '#881e33'
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    }
  });
}

module.exports = router; 
