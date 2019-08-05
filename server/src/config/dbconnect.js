const mongoose = require('mongoose')

function connect () {
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true})
}

module.exports = connect