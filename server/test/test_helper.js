process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

// const mongoServer = new MongoMemoryServer();

mongoose.Promise = global.Promise;

// mongoServer.getUri().then((mongoUri) => {
//   const mongoOpts = {
//     autoReconnect: true,
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 1000,
//     useNewUrlParser: true
//   };

//   mongoose.connect(mongoUri, mongoOpts);

//   mongoose.connection.on("error", (e) => {
//     if (e.message.code === "ETIMEDOUT") {
//       console.log(e);
//       mongoose.connect(mongoUri, mongoOpts);
//     }
//     console.log(e);
//   });

//   mongoose.connection.once("open", () =>
//     console.log(`Mongo URI ${mongoUri} connected`)
//   );

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase().then(() => {
//       console.log("DB Dropped");
//       done();
//     });
//   });
// });

const mongoOptions = {
  useNewUrlParser: true
};

before(async () => {
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
