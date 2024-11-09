const mongoose = require('mongoose');

const hireusfollowupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true , unique: true},
  inquiryStatus: { type: String, },  
  date: { type: Date, required: true, default: Date.now}, 
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

const HireUsFollowUp = mongoose.model('HireUsFollowUp', hireusfollowupSchema );

module.exports = HireUsFollowUp;