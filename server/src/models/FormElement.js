const mongoose = require('mongoose');

const formElement = new mongoose.Schema({
    elementType: {
        type: String,
        enum: ['text', 'email', 'url', 'number', 'checkbox', 'radio', 'textarea'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    label: String,
    value: Mixed,
    attr: [Mixed]
});

const FormElement = mongoose.Model('formElement', formElement);

module.exports = FormElement;