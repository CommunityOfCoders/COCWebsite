require("dotenv").config();
const mongoose = require("mongoose");

function connect(callback) {
  const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: process.env.NODE_ENV !== "production"
  };

  let connectionString = "mongodb://localhost:27017/test";

  if (process.env.NODE_ENV !== "test") {
    if (process.env.NODE_ENV === "production") {
      connectionString = process.env.MONGO_URI_PROD;
    } else {
      connectionString = process.env.MONGO_URI;
    }
  }
  mongoose.connect(connectionString, mongooseOptions).then(() => {
    callback();
  });
  mongoose.Promise = global.Promise;
  mongoose.connection.on("open", () => console.log(`MongoDB Connected`));
  mongoose.connection.on("error", console.error.bind(console, "Mongo Error"));
  // callback();
}

module.exports = connect;
