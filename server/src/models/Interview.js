const mongoose = require('mongoose')

const interview = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: { type: String, required: true },
    companyName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    content: { type: Object },
    status: { type: String, required: true }, 
    appliedFor: { type: String, required: true },
    appliedYear: { type: Date, required: true },
});

const Interview = mongoose.model('interviews', interview);

module.exports = Interview;
