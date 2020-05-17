const assert = require('assert');
const User = require("../../../src/models/User");

let user;
let newUser;

describe("Updating Users", () => {

  beforeEach((done) => {

    newUser = {
      username: "Test new username",
      password: "Test new password",
      email: "Test new email",
      graduationYear: 2019,
    };

    user = new User({
      username: "Test username",
      password: "Test password",
      email: "Test email",
      graduationYear: 2018,
    });
    user.save().then(() => {
      done();
    });
  });

  it("finds User with matching username", (done) => {

    User.findOneAndUpdate({ username: "Test username" }, newUser)
      .then(() => User.findOne({ username: "Test new username" }))
      .then((user) => {
        assert(user !== null);
        assert(user.username === "Test new username");
        assert(user.password === "Test new password");
        assert(user.email === "Test new email");
        assert(user.graduationYear === 2019);
        done();
      });
  });

  it("finds User with matching password", (done) => {
    User.findOneAndUpdate({ password: "Test password" }, newUser)
      .then(() => User.find())
      .then((user) => {
        assert(user !== null);
        assert(user[0].username === "Test new username");
        assert(user[0].password === "Test new password");
        assert(user[0].email === "Test new email");
        assert(user[0].graduationYear === 2019);
        done();
      });
  });

  it("finds User with matching email", (done) => {
    User.findOneAndUpdate({ email: "Test email" }, newUser)
      .then(() => User.find())
      .then((user) => {
        assert(user !== null);
        assert(user[0].username === "Test new username");
        assert(user[0].password === "Test new password");
        assert(user[0].email === "Test new email");
        assert(user[0].graduationYear === 2019);
        done();
      });
  });

  it("finds User with matching graduation year", (done) => {
    User.findOneAndUpdate({ graduationYear: 2018 }, newUser)
      .then(() => User.find())
      .then((user) => {
        assert(user !== null);
        assert(user[0].username === "Test new username");
        assert(user[0].password === "Test new password");
        assert(user[0].email === "Test new email");
        assert(user[0].graduationYear === 2019);
        done();
      });
  });
})