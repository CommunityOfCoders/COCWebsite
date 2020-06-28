const User = require("../../src/models/User");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const app = require("../../src/app");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Users", () => {
  afterEach((done) => {
    User.remove().then(() => done());
  });

  describe("/POST user register", () => {
    it("adds user with registration", (done) => {
      let user = new User({
        username: "Test user",
        password: "Test password",
        email: "Test email",
        graduationYear: 2018,
      });

      chai
        .request(app)
        .post("/api/register")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          res.body.should.be.an("object");
          res.body.should.have.property("username").eql("Test user");
          res.body.should.have.property("token").not.eql("");
          done();
        });
    });

    it("returns 203 if user already exista", (done) => {
      let user = new User({
        username: "Test user",
        password: "Test password",
        email: "Test email",
        graduationYear: 2018,
      });

      user.save().then(
        chai
          .request(app)
          .post("/api/register")
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(422);
            res.body.should.be.an("object");
            res.body.should.have
              .property("error")
              .eql("UserName Already Exists");
            done();
          })
      );
    });
  });

  describe("/POST user login", () => {
    let user;

    beforeEach((done) => {
      user = new User({
        username: "Test user",
        password: "Test password",
        email: "Test email",
        graduationYear: 2018,
      });
      chai
        .request(app)
        .post("/api/register")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          done();
        });
    });

    it("logs in user if successful", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("username").eql("Test user");
          res.body.should.have.property("token").not.eql(null);
          done();
        });
    });

    it("returns 400 if username is invalid", (done) => {
      user.username = "Wrong test username";
      chai
        .request(app)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("error");
          done();
        });
    });

    it("returns 401 if password is invalid", (done) => {
      user.password = "Wrong test password";
      chai
        .request(app)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(401);
          res.body.should.be.an("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("/POST user verify token", () => {
    describe("verify token if user registers", () => {
      let user;
      let authenticatedUser;

      beforeEach((done) => {
        user = new User({
          username: "Test user",
          password: "Test password",
          email: "Test email",
          graduationYear: 2018,
        });
        chai
          .request(app)
          .post("/api/register")
          .send(user)
          .end((err, res) => {
            if (err) throw err;
            authenticatedUser = res.body;
            res.should.have.status(201);
            done();
          });
      });

      it("gives 200 on successful verification", (done) => {
        chai
          .request(app)
          .post("/api/verify-token")
          .send(authenticatedUser)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("status").eql(true);
            done();
          });
      });

      it("gives 403 on unsuccessful verification", (done) => {
        authenticatedUser.token = "Wrong token";
        chai
          .request(app)
          .post("/api/verify-token")
          .send(authenticatedUser)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(403);
            res.body.should.be.an("object");
            res.body.should.have.property("status").eql(false);
            done();
          });
      });
    });

    describe("verify token if user logs in", () => {
      let user;
      let authenticatedUser;

      beforeEach((done) => {
        user = new User({
          username: "Test user",
          password: "Test password",
          email: "Test email",
          graduationYear: 2018,
        });
        chai
          .request(app)
          .post("/api/register")
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(201);
            chai
              .request(app)
              .post("/api/login")
              .send(user)
              .end((err, res) => {
                if (err) throw err;
                authenticatedUser = res.body;
                done();
              });
            // done();
          });
      });

      it("gives 200 on successful verification", (done) => {
        chai
          .request(app)
          .post("/api/verify-token")
          .send(authenticatedUser)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("status").eql(true);
            done();
          });
      });

      it("gives 403 on unsuccessful verification", (done) => {
        authenticatedUser.token = "Wrong token";
        chai
          .request(app)
          .post("/api/verify-token")
          .send(authenticatedUser)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(403);
            res.body.should.be.an("object");
            res.body.should.have.property("status").eql(false);
            done();
          });
      });
    });
  });

  describe("/POST user", () => {
    it("finds user with username", (done) => {
      let user = new User({
        username: "Test user",
        password: "Test password",
        email: "Test email",
        graduationYear: 2018,
      });

      user.save((err, user) => {
        if (err) throw err;
        chai
          .request(app)
          .post("/api/user")
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("username").eql("Test user");
            res.body.should.have.property("password").eql(null);
            res.body.should.have.property("email").eql("Test email");
            res.body.should.have.property("graduationYear").eql(2018);
            done();
          });
      });
    });

    it("returns 404 if user has incorrect name", (done) => {
      let user = new User({
        username: "Test user",
        password: "Test password",
        email: "Test email",
        graduationYear: 2018,
      });
      user.save((err, user) => {
        if (err) throw err;
        user.username = "Wrong test user";
        chai
          .request(app)
          .post("/api/user")
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(404);
            res.body.should.be.an("object");
            res.body.should.have.property("message");
            res.body.should.have.property("error");
            done();
          });
      });
    });
  });
});
