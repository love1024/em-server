const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('BILLING_RATE', new Schema({
  billingId: String,
  technologyName: String,
  resourceOffshoreRate: Number,
  resourceOnshoreShorttermRate: Number,
  resourceOnshoreLongtermRate: Number,
  resourceOncallStandbyRate: Number,
  resourceOncallSupportWeekdayRate: Number,
  resourceOncallSupportWeekendRate: Number
}))
