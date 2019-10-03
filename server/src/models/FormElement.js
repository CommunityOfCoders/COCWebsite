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
    value: mongoose.Schema.Types.Mixed,
    attr: [mongoose.Schema.Types.Mixed]
});

const FormElement = mongoose.model('formElement', formElement);

module.exports = FormElement;