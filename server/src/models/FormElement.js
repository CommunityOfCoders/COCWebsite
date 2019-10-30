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
    value: mongoose.Schema.Types.Mixed,
    style: String,
    class: String,
    attr: [mongoose.Schema.Types.Mixed]
});

const FormElement = mongoose.model('formElement', formElement);

module.exports = FormElement;