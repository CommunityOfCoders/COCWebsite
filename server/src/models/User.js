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
    graduationYear: {
        type: Number,
        required: true
    },
    isMember: {  // if true, the name and image will be shown on the members page
        type: Boolean,
        required: true,
        default: false
    },
    isBlogAuthorized: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {  // member description
        type: String,
        required: false
    },
    image: {  // member image
        data: Buffer,
        contentType: String,
        default: ""
    },
    passwordResetToken: {
        type: String,
        required: false
    },
    passwordResetTokenTime: {
        type: Date,
        required: false
    }
})

user.index({ username: 1 })

const User = mongoose.model('users', user)

module.exports = User;
