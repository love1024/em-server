const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE', new Schema({
  resourceId: { type: Number, required: true },
  resourceName: { type: String, required: true },
  resourceEmail: { type: String, required: true },
  resourceErsteJoiningDate: { type: Date, required: true },
  resourceLevelId: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  resourceCertifications: [{ type: String }],
  location: { type: String, required: true },
  citrix: { type: Boolean, default: false },
  active: { type: Boolean, required: true },
  role: { type: String },
  password: { type: String },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))
