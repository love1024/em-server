const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('DEPARTMENT', new Schema({
  departmentId: { type: Number },
  departmentName: { type: String, required: true },
  departmentHod: { type: String, required: true },
  departmentHodEmail: { type: String, required: true },
  active: { type: Boolean, default: false },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))