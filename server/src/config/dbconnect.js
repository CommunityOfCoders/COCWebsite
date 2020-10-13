require("dotenv").config()
const mongoose = require("mongoose");

function connect() {
  const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  console.log(process.env.MONGO_URI);
  mongoose.connect(process.env.MONGO_URI, mongooseOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", console.error.bind(console, "MongoDB error"));
}

module.exports = connect;
