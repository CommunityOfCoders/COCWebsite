const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerForm = Schema({
    formElements: [{
        type: Schema.Types.ObjectId,
        ref: 'formElement'
    }],
    maxGradYear: Number,
    title: String,
    description: String,
    max_responses: Number,
    mail_response: Boolean,
    closeTime: Date
});

module.exports = mongoose.Model('registerForm', registerForm);