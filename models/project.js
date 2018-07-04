const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('PROJECT', new Schema({
  projectId: { type: Number },
  projectNameAsPerSow: { type: String, required: true },
  departmentId: { type: Number, required: true },
  technologyId: { type: Number, required: true },
  projectModelName: { type: String, required: true },
  projectSitTAM: { type: String, required: true },
  projectSitTAMEmail: { type: String, required: true },
  projectSitProjectManager: { type: String, required: true },
  projectSitProjectManagerEmail: { type: String, required: true },
  projectNagarroTAMId: { type: Number, required: true },
  projectNagarroPMId: { type: Number, required: true },
  projectStartDate: { type: Date, required: true },
  projectEndDate: { type: Date, required: true },
  projectCostCenter: { type: Number, required: true },
  projectPONumber: { type: Number, required: true },
  dateFrom: { type: Date, default: Date.now() },
  dateUntil: { type: Date, default: Date.now() },
  fipUser: { type: String, required: true },
  fipProg: { type: String, required: true },
  fipTst: { type: Date, default: Date.now() },
}))