const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('TECHNOLOGY', new Schema({
  technologyId: { type: Number },
  technologyName: { type: String, required: true },
  resLevelMsaName: { type: String, required: true },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))