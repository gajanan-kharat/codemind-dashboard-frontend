const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  course: { type: String, required: true },
  // inquiryStatus: { type: String },
  // date: { type: Date }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
