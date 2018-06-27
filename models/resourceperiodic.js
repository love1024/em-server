const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCE_PERIODIC', new Schema({
  year: Number,
  month: Number,
  resourceId: Number,
  offshoreDays: Number,
  onshoreDays: Number,
  standbyDays: Number,
  oncallSupportWeekdayDays: Number,
  oncallSupportWeekendDays: Number,
  onsiteStartDate: { type: Date, default: Date.now },
  onsiteEndDate: { type: Date, default: Date.now },
  unplannedAbsenteesm: Number,
  utilization: Number,
  resourceIsFixPrice: Boolean,
  resourceFixPriceAmount: Number,
  attendenceId: Number,
  infraId: Number,
}))



