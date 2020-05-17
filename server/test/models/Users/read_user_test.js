const assert = require('assert');
const User = require("../../../src/models/User");

let user;

describe("Reading Users", () => {

  beforeEach((done) => {
    user = new User({
      username: "Test username",
      password: "Test password",
      email: "Test email",
      graduationYear: 2018,
    });
    user.save().then(() => done());
  });

  it("finds User with matching UserName", (done) => {
    User.findOne({ username: "Test username" })
      .then((user) => {
        assert(user != null);
        done();
      });
  });

  it("finds User with matching password", (done) => {
    User.findOne({ password: "Test password" })
      .then((user) => {
        assert(user != null);
        done();
      });
  });

  it("finds User with matching email", (done) => {
    User.findOne({ email: "Test email" })
      .then((user) => {
        assert(user != null);
        done();
      });
  });

  it("finds User with matching graduation year", (done) => {
    User.findOne({ graduationYear: 2018 })
      .then((user) => {
        assert(user != null);
        done();
      });
  });
})