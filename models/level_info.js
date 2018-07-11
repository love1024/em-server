const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('LEVEL_INFO', new Schema({
  levelId: { type: Number },
  levelName: { type: String, required: true },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() }
}))
