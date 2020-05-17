const assert = require('assert');
const User = require("../../../src/models/User");

let user;

describe("Delete Users", () => {

  beforeEach((done) => {
    user = new User({
      username: "Test username",
      password: "Test password",
      email: "Test email",
      graduationYear: 2018,
    });
    user.save().then(() => done());
  });

  it("finds User with matching username", (done) => {
    User.findOneAndDelete({ username: "Test username" })
      .then((returnedUser) => {
        assert(returnedUser !== null);
        assert(returnedUser.password === user.password);
        assert(returnedUser.email === user.email);
        assert(returnedUser.graduationYear === user.graduationYear);
        done();
      });
  });

  it("finds User with matching password", (done) => {
    User.findOneAndDelete({ password: "Test password" })
      .then((returnedUser) => {
        assert(returnedUser !== null);
        assert(returnedUser.username === user.username);
        assert(returnedUser.email === user.email);
        assert(returnedUser.graduationYear === user.graduationYear);
        done();
      });
  });

  it("finds User with matching email", (done) => {
    User.findOneAndDelete({ email: "Test email" })
      .then((returnedUser) => {
        assert(returnedUser !== null);
        assert(returnedUser.password === user.password);
        assert(returnedUser.username === user.username);
        assert(returnedUser.graduationYear === user.graduationYear);
        done();
      });
  });

  it("finds User with matching graduation year", (done) => {
    User.findOneAndDelete({ graduationYear: 2018 })
      .then((returnedUser) => {
        assert(returnedUser !== null);
        assert(returnedUser.password === user.password);
        assert(returnedUser.email === user.email);
        assert(returnedUser.username === user.username);
        done();
      });
  });

})