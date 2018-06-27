const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('LEVEL_CHANGE', new Schema({
  resourceLevelId: Number,
  levelName: String
}))
