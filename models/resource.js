const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE', new Schema({
  resourceId: Number,
  resourceName: String,
  resourceEmail: String,
  resourceErsteJoiningDate: { type: Date, default: Date.now },
  resourceProjectId: Number,
  isNagarroTam: Boolean,
  resourceLevelName: String,
  resourceCertifications: String,
  resourceAllocation: Number,
  resourceAllocationEndDate: { type: Date, default: Date.now },
  resourceIsbillable: Boolean,
  resourceIsPm: Boolean,
  resourceLevelMsaName: String,
  resourceLevelChangeId: [{ type: Schema.Types.ObjectId, ref: 'LEVEL_CHANGE' }],
  resourceBillingId: String
}))
