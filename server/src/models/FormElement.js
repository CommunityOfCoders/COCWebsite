const mongoose = require('mongoose');

const formElement = new mongoose.Schema({
    elementType: {
        type: String,
        enum: ['text', 'email', 'url', 'number', 'checkbox', 'radio', 'textarea', 'label'],
        required: true
    },
    id: String,
    name: {
        type: String,
        required: true
    },
    for: String,
    value: Mixed,
    style: String,
    class: String,
    attr: [Mixed]
});

const FormElement = mongoose.Model('formElement', formElement);

module.exports = FormElement;