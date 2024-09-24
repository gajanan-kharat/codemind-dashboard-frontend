const mongoose = require('mongoose');

const studentInformationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  cityName: { type: String, required: true },
  state: { type: String },
  batch: { type: String, required: true },
  course: { type: String, required: true },
  graduation: { type: String, required: true },
  passingYear: { type: Number, required: true },
  collegeName: { type: String, required: true },
  attendance: { type: String, required: true },
  parentEmail: { type: String },
  parentMobileNumber: { type: String },
  mock1Feedback: { type: String },
  mock2Feedback: { type: String },
  mock3Feedback: { type: String }
});

const StudentInformation = mongoose.model('StudentInformation', studentInformationSchema);

module.exports = StudentInformation;
