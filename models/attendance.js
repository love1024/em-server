const mongoose = require('mongoose')
const Schema = mongoose.Schema


module.exports = mongoose.model('ATTENDANCE', new Schema({
  attendanceId: Number,
  resourceId: { type: Number, required: true },
  approvalDate: { type: Date, default: Date.now },
  taskId: { type: Number, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  attendanceType: String,
  presentType: String,
  leaveType: String,
  holidayType: String,
  wfh: Boolean,
  clientApprovalDate: { type: Date, default: Date.now },
  remarks: { type: String, required: true },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))