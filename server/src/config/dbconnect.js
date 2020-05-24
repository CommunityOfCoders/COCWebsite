const mongoose = require('mongoose')

function connect () {
    const mongooseOptions = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    mongoose.connect('mongodb://localhost:27017/test', mongooseOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, "MongoDB error"));
}

module.exports = connect