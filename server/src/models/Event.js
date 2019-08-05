const mongoose = require('mongoose')

const event = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    }
})

const Event = mongoose.model('events',event)

module.exports = Event;