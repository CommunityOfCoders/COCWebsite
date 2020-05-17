const mongoose = require('mongoose')

function connect () {
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, "MongoDB error"));
}

module.exports = connect