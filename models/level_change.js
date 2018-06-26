const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('LEVEL_CHANGE', new Schema({
  levelChangeId: Number,
  resourceLevelId: Number,
  levelChangeStartDate: { type: Date, default: Date.now },
  levelChangeEndDate: { type: Date, default: Date.now }
}))
