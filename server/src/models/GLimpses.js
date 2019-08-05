const mongoose = require('mongoose')

const glimpse = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    }
})

const Glimpses = mongoose.model('glimpses',glimpse)

module.exports = Glimpses;