const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('ATTENDANCE', new Schema({
  attendanceId: Number,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  attendanceType: { type: String, required: true },
  approvedBy: { type: String, required: true },
  approvalDate: { type: Date, default: Date.now },
  leaveType: { type: String, default: "" },
  reason: { type: String, required: true },
  clientApprovalDate: { type: Date, default: Date.now }
}))