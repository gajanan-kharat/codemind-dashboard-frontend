const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile_number: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  // course: { type: String, required: true },
  city: { type: String },
  gitUrl: { type: String },
  resume: { type: String },
  photo: { type: String },
  mockFeedback: { type: String }, 
  attendance: {type: String },  
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
