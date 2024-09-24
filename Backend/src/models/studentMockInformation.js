const mongoose = require('mongoose');

const mockInformationSchema = new mongoose.Schema({
  mockNumber: { type: String, required: true },
  mockDate: { type: Date, required: true },
  mockTime: { type: String, required: true },
  mockStatus: { type: String, required: true },
  feedback: { type: String, required: false }
});

const studentMockInformationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  graduation: { type: String, required: true },
  passingYear: { type: Number, required: true },
  mocks: [mockInformationSchema]
});

const StudentMockInformation = mongoose.model('StudentMockInformation', studentMockInformationSchema);
module.exports = StudentMockInformation;
