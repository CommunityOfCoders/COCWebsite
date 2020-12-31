const mongoose = require('mongoose');

const project = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    projectUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    owner: {
        type: {
          name: {
            type: String,
            required: true
          },
          email: String,
          githubUrl: String
        },
        required: true
    },
    domains: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'domain'
        }],
        required: true
    }
});

const Project = mongoose.model('project', project);

module.exports = Project;
