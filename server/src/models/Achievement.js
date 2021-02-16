const mongoose = require('mongoose');

const achievement = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: {
      fullName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  projectUrl: {
    type: String,
    required: false
  }
});

const Achievement = mongoose.model('achievement', achievement);

module.exports = Achievement;
