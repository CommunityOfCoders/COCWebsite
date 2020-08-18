const config = require("../src/config");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
mongoose.Promise = global.Promise;

const mongoOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

before(async () => {
  config.env = "test";
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, mongoOptions);
  console.log(`Mongo URI started on ${mongoUri}`);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log(`Mongo URI stopped`);
});
