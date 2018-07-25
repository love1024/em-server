const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('BILLING_RATE', new Schema({
  billingId: { type: Number },
  technologyId: { type: Number, required: true },
  resourceLevelId: { type: Number, required: true },
  resourceOffshoreRate: { type: Number, required: true },
  resourceOnshoreShorttermRate: { type: Number, required: true },
  resourceOnshoreLongtermRate: { type: Number, required: true },
  resourceOncallStandbyRate: { type: Number, required: true },
  resourceOncallSupportWeekdayRate: { type: Number, required: true },
  resourceOncallSupportWeekendRate: { type: Number, required: true },
  active: { type: Boolean, default: false },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))
