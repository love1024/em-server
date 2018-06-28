const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE', new Schema({
  resourceId: Number,
  resourceName: String,
  resourceEmail: String,
  resourceErsteJoiningDate: { type: Date, default: Date.now },
  resourceProjectId: Number,
  isNagarroTAM: Boolean,
  resourceLevelId: Number,
  resourceCertifications: String,
  resourceAllocation: Number,
  resourceAllocationEndDate: { type: Date, default: Date.now },
  resourceIsBillable: Boolean,
  resourceIsPM: Boolean,
  resourceLevelMsaName: String,
  levelChangeStartDate: { type: Date, default: Date.now },
  levelChangeEndDate: { type: Date, default: Date.now },
  resourceBillingId: String
}))
