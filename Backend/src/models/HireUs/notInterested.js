const mongoose = require('mongoose');

const hireusnotinterestedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true},
  inquiryStatus: { type: String, },  
  date: { type: Date, required: true }, 
//   batch: { type: String },
//   reference: { type: String},
//   admission:{ type: String},
  source: { type: String},
  sourcecomment: { type: String},
//   comments: [{
//     date: { type: Date, required: true, default: Date.now },
//     comment: { type: String}
//   }]
});

const HireUsNotInterested = mongoose.model('HireUsNotInterested', hireusnotinterestedSchema );

module.exports = HireUsNotInterested;