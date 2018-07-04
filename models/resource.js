const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE', new Schema({
  resourceId: { type: Number, required: true },
  resourceName: { type: String, required: true },
  resourceEmail: { type: String, required: true },
  resourceErsteJoiningDate: { type: Date, required: true },
  resourceLevelId: { type: Number, required: true },
  resourceCertifications: [{ type: String }],
  active: { type: Boolean, required: true },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))
