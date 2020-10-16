const auth = require("../../../src/middleware/auth");
const httpMocks = require("node-mocks-http");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const config = require("../../../src/config");

describe("middleware/auth", () => {
  describe("loginRequired", () => {
    let token;
    before(() => {
      token = jwt.sign(
        { user: { username: "Test", password: "admin" } },
        config.privateKey,
        {
          expiresIn: 3600,
        }
      );
    });

    it("should have error if jwt isn't set", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/event",
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      auth.loginRequired(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(500);
      done();
    });

    it("should have error if jwt is malformed", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/event",
        headers: {
          authorization: `Bearer InvalidToken`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      auth.loginRequired(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(400);
      done();
    });

    it("should not have error if jwt is set", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/event",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      auth.loginRequired(req, res, next);
      var data = res._getStatusCode();
      console.log(res._getData());
      expect(data).equal(200);
      done();
    });
  });
});
