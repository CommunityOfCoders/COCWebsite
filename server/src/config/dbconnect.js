require("dotenv").config();
const mongoose = require("mongoose");

function connect() {
  const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  mongoose.connect(process.env.MONGO_URI, mongooseOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("open", () => console.log("MongoDB Connected"));
}

module.exports = connect;
