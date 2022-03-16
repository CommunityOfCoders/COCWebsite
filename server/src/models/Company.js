const mongoose = require('mongoose')

const company = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

const Company = mongoose.model('companies', company);

module.exports = Company;
