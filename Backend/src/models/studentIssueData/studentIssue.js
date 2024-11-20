const mongoose = require('mongoose');

const studentIssueSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  batch: { type: String, required: true},
  description: { type: String, required:true },
  screenshot: { type: String } ,
  source: { type: String},
  issue_created_date: { type: Date , default: Date.now},
  issueStatus: { type: String, default: 'In Progress' },
  technicalExpert: {
    technicalExpertName: { type: String },
    issue_assigned_date: { type: Date, default: Date.now },
    // zoomLink: { type: String },
  },
});

const studentIssue = mongoose.model('studentIssue', studentIssueSchema);

module.exports = studentIssue;
