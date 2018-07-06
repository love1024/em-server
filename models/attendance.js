const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceType = {
  present: {
    offshore: { type: boolean, default: false },
    onshore: { type: boolean, default: false },
    onshoreShortTerm: { type: boolean, default: false },
    onshoreLongTerm: { type: boolean, default: false },
    oncallWeekendSupport: { type: boolean, default: false },
    standbySupport: { type: boolean, default: false },
    wfh: { type: boolean, default: false }
  },
  leave: {
    planned: { type: boolean, default: false },
    clientApprovalDate: { type: Date, default: Date.now },
    unplanned: { type: boolean, default: false },
  },
  holiday: {
    offshore: { type: boolean, default: false },
    onshore: { type: boolean, default: false }
  }
}

module.exports = mongoose.model('ATTENDANCE', new Schema({
  attendanceId: Number,
  resourceId: { type: Number, required: true },
  approvalDate: { type: Date, default: Date.now },
  taskId: { type: Number, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  attendanceType: attendanceType,
  remarks: { type: String, required: true },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))