const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/testSuite", { useFindAndModify: false, useCreateIndex: true });
mongoose.connection
  .once('open', () => console.log("MongoDB TestSuite connected"))
  .on('error', (error) => console.warn('Error : ', error));

afterEach((done) => {
  mongoose.connection.db.dropDatabase().then(() => {
    // console.log("DB Dropped");
    done()
  });

});
