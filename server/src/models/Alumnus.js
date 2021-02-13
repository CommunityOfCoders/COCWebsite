const mongoose = require('mongoose');

const alumnus = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  graduationYear: {
    type: String,
    required: true
  },
  socialUrls: {
    personal: String,
    facebook: String,
    github: String,
    instagram: String,
    linkedin: String,
    twitter: String,
  },
  imageUrl: {
    type: String,
  },
  company: {
    type: String,
    required: true
  },
  professionalTitle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Alumnus = mongoose.model('alumnus', alumnus);

module.exports = Alumnus;
