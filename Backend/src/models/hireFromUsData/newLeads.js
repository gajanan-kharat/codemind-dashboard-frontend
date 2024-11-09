
const mongoose = require('mongoose');

const HireUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: {type: String, required: true},
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  source: { type: String},
  date: { type: Date , default: Date.now}
  //  course: { type: String, required: true },
  // inquiryStatus: { type: String },
//   date: { type: Date , default: Date.now}
});

const HireUs = mongoose.model('HireFromUs',HireUsSchema);

module.exports =  HireUs;