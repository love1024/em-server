const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('PROJECT', new Schema({
  projectId: Number,
  projectNameAsPerSow: String,
  departmentId: Number,
  projectTechnology: String,
  projectModelName: String,
  projectsItTam: String,
  projectsItTamEmail: String,
  ProjectsItProjectManager: String,
  projectsItProjectManagerEmail: String,
  projectStartDate: { type: Date, default: Date.now },
  technologyName: String,
  projectCostCenter: Number,
  projectPoNumber: Number
}))