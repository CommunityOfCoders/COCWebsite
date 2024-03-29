const mongoose = require('mongoose')

const interview = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    companyRequest: { type: String, required: true },
    content: { type: Object },
    isVerified: { type: Boolean, default: false }, 
    isDraft: { type: Boolean, required: true },
    appliedFor: { type: String, required: true },
    appliedYear: { type: Number, required: true },
});

const Interview = mongoose.model('interview', interview);

module.exports = Interview;
