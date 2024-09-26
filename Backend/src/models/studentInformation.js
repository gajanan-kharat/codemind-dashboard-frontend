const mongoose = require('mongoose');

const studentInformationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, },
  cityName: { type: String, },
  state: { type: String },
  batch: { type: String, },
  course: { type: String, },
  graduation: { type: String, },
  passingYear: { type: Number, },
  collegeName: { type: String, },
  attendance: { type: String, },
  parentEmail: { type: String },
  parentMobileNumber: { type: String },
  mock1Feedback: { type: String },
  mock2Feedback: { type: String },
  mock3Feedback: { type: String },
  paymentStatus: { type: String },
  placementStatus: { type: String }

});

const StudentInformation = mongoose.model('StudentInformation', studentInformationSchema);

module.exports = StudentInformation;
