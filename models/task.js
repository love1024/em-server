const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('TASK', new Schema({
  taskId: { type: Number },
  taskName: { type: String },
  active: { type: Boolean, default: true },
}))