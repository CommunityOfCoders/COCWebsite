const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    graduationYear: Number
})

const User = mongoose.model('users',user)

module.exports = User;