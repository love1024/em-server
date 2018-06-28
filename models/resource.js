const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE', new Schema({
  resourceId: { type: Number, required: true },
  resourceName: { type: String, required: true },
  resourceEmail: { type: String, required: true },
  resourceErsteJoiningDate: { type: Date, default: Date.now, required: true },
  resourceProjectId: { type: Number, required: true },
  isNagarroTAM: Boolean,
  resourceLevelId: { type: Number, required: true },
  resourceCertifications: { type: String },
  resourceAllocation: { type: Number, required: true },
  resourceAllocationEndDate: { type: Date, default: Date.now, required: true },
  resourceIsBillable: Boolean,
  resourceIsPM: Boolean,
  resourceLevelMsaName: { type: String, required: true },
  levelChangeStartDate: { type: Date, default: Date.now, required: true },
  levelChangeEndDate: { type: Date, default: Date.now },
  resourceBillingId: { type: String, required: true }
}))
