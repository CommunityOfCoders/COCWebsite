const assert = require("assert");
const User = require("../../../src/models/User");

describe('Testing Users', () => {
  it('creates an user', (done) => {
    let user = {
      username: "Test username",
      password: "Test password",
      email: "Test email",
      graduationYear: 2018,
    };

    const newUser = new User(user);
    newUser.save().then((user) => {
      assert(!newUser.isNew);
      assert(user.username === "Test username");
      assert(user.password === "Test password");
      assert(user.email === "Test email");
      assert(user.graduationYear === 2018);
      assert(user.isMember === false);
      assert(user.isBlogAuthorized === false);
      done();
    })
  });
})