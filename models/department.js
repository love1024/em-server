const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('DEPARTMENT', new Schema({
  departmentId: Number,
  departmentName: String,
  departmentHod: String,
  departmentHodEmail: String
}))