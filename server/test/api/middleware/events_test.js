const event = require("../../../src/middleware/event");
const httpMocks = require("node-mocks-http");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const config = require("../../../src/config");

describe("middleware/event", () => {
  describe("isMember", () => {
    let trueToken, falseToken;
    before(() => {
      trueToken = jwt.sign({ user: { isMember: true } }, config.privateKey, {
        expiresIn: 3600,
      });

      falseToken = jwt.sign({ user: { isMember: false } }, config.privateKey, {
        expiresIn: 3600,
      });
    });

    it("should show 500 if jwt isn't set", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/events",
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      event.isMember(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(500);
      done();
    });

    it("should show 500 if jwt is malformed", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/events",
        headers: {
          authorization: "Bearer InvalidToken",
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      event.isMember(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(500);
      done();
    });

    it("should show 403 if user is not authorized", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/events",
        headers: {
          authorization: `Bearer ${falseToken}`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      event.isMember(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(403);
      done();
    });

    it("should show 201 if jwt is malformed", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/events",
        headers: {
          authorization: `Bearer ${trueToken}`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      event.isMember(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(200);
      done();
    });
  });
});
