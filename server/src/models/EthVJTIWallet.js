const mongoose = require('mongoose')

const ethuser = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: false
    },
    isMinted: {
        type: Boolean,
        required: false,
        default: false,
    },
    emailVerificationOTP: {
        type: String,
        required: false
    }
})

ethuser.index({ email: 1 })

const EthUser = mongoose.model('ethuser', ethuser)

module.exports = EthUser;
