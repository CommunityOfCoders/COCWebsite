const mongoose = require('mongoose');

const formElement = new mongoose.Schema({
    elementType: {
        type: String,
        enum: ['text', 'email', 'url', 'number', 'checkbox', 'radio', 'textarea', 'label'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    attr: [mongoose.Schema.Types.Mixed]
});

const FormElement = mongoose.model('formElement', formElement);

module.exports = FormElement;