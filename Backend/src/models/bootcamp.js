const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    Mobile_number: { type: String, required: true , unique: true},
    paymentId: { type: String },
    paymentStatus: { type: String, require: true },
    courses: { type: String },
    batch: { type: String },
    // inquiryStatus: { type: String },
    date: { type: Date },
});

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;
