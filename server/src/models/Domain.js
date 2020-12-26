const mongoose = require('mongoose');

const domain = new mongoose.Schema({
    domainName: {
        type: String,
        required: true
    },
    domainDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    projects: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'project'
        }],
        required: false,
        default: []
    }
});

const Domain = mongoose.model('domain', domain);

module.exports = Domain;
