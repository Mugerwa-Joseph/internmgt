const mongoose = require('mongoose');

// Define the schema
const studentDataSchema = new mongoose.Schema({
    stuName: String,
    campus: String,
    schoolName: String,
    schoolDistrict: String,
    schoolTown: String,
    distanceFromBugema: String,
    regNumber: String,
    phoneNumber: String,
    emailAddress: String,
    initialAmountPaid: Number,
    practiceRegistered: String,
    supervisor1: Number,
    supervisor2: Number,
    average: Number
});

// Create the model using the schema
const StudentData = mongoose.model('StudentData', studentDataSchema);

module.exports = StudentData;
