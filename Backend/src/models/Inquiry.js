const mongoose = require('mongoose');

const InquirystudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  // inquiryStatus: { type: String },
  date: { type: Date , default: Date.now}
});

const InquiryStudent = mongoose.model('Inquiry', InquirystudentSchema);

module.exports = InquiryStudent;
