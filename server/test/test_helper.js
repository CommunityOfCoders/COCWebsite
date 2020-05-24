const config = require("../src/config");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
mongoose.Promise = global.Promise;

const mongoOptions = {
  useNewUrlParser: true
};

before(async () => {
  config.env = 'test';
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, mongoOptions);
  console.log(`Mongo URI started on ${mongoUri}`);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log(`Mongo URI stopped`);
})
