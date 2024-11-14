const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true , unique: true},
    paymentId: { type: String },
    paymentStatus: { type: String, require: true },
    course: { type: String, default: "Angular" },
    batch: { type: String },
    source: {type: String, default: "Bootcamp Website"},
    // inquiryStatus: { type: String },
    date: { type: Date , default: Date.now},
});

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;
