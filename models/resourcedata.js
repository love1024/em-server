const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('RESOURCEDATA', new Schema({
  year: Number,
  month: Number,
  resourceId: Number,
  offshoreDays: Number,
  onshoreDays: Number,
  standbyDays: Number,
  oncallSupportWeekdayDays: Number,
  oncallSupportWeekendDays: Number,
  onsiteStartDate: datetime,
  onsiteEndDate: datetime,
  unplannedAbsenteesm: Number,
  utilization: Number,
  resourceIsFixPrice: Boolean,
  resourceFixPriceAmount: Number,
  attendenceId: Number,
  infraId: Number,
}))



