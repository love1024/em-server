const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('ATTENDANCE', new Schema({
  attendanceId: Number,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  attendanceType: String,
  approvedBy: String,
  approvalDate: { type: Date, default: Date.now },
  leaveType: String,
  reason: String,
  C_A_D: { type: Date, default: Date.now }
}))