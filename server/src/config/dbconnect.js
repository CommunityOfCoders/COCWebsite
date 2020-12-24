require("dotenv").config();
const mongoose = require("mongoose");

function connect() {
  const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  let connectionString = "mongodb://localhost:27017/test";

  if (process.env.NODE_ENV !== "test") {
    if (process.env.NODE_ENV === "development") {
      connectionString = process.env.MONGO_URI;
    } else {
      connectionString = process.env.MONGO_URI_PROD;
    }
  }
  mongoose.connect(connectionString, mongooseOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("open", () => console.log(`MongoDB Connected`));
  mongoose.connection.on("error", console.error.bind(console, "Mongo Error"));
}

module.exports = connect;
