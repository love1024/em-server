const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('PROJECT_RESOURCE', new Schema({
  projectResourceId: Number,
  projectId: { type: Number, required: true },
  resourceId: { type: Number, required: true },
  billRateId: { type: Number, required: true },
  resourceAllocation: { type: Number, required: true },
  resourceIsBillable: { type: Boolean, required: true },
  nonBillable: { type: String, required: true },
  technologyId: { type: Number, required: true },
  keyResource: { type: Boolean, required: true },
  invoicingEntity: { type: String, required: true },
  active: { type: Boolean, required: true },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))
