const mongoose = require('mongoose');

const formElement = new mongoose.Schema({
    elementType: {
        type: String,
        enum: ['text', 'email','number', 'checkbox', 'radio', 'textarea'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: Mixed
});

const FormElement = mongoose.Model('formElements', formElement);

module.exports = FormElement;