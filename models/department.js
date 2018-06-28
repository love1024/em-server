const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('DEPARTMENT', new Schema({
  departmentId: { type: Number, required: true },
  departmentName: { type: String, required: true },
  departmentHod: { type: String, required: true },
  departmentHodEmail: { type: String, required: true },
}))