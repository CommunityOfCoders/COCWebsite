const blog = require("../../../src/middleware/blog");
const httpMocks = require("node-mocks-http");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const config = require("../../../src/config");

describe("middleware/blog", () => {
  describe("isBlogAuthorized", () => {
    let trueToken, falseToken;
    before(() => {
      trueToken = jwt.sign(
        { user: { isBlogAuthorized: true } },
        config.privateKey,
        {
          expiresIn: 3600,
        }
      );

      falseToken = jwt.sign(
        { user: { isBlogAuthorized: false } },
        config.privateKey,
        {
          expiresIn: 3600,
        }
      );
    });

    it("should show 500 if jwt isn't set", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/blog/new",
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      blog.isBlogAuthorized(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(500);
      done();
    });

    it("should show 500 if jwt is malformed", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/blog/new",
        headers: {
          authorization: `Bearer InvalidToken`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      blog.isBlogAuthorized(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(500);
      done();
    });

    it("should show 201 if jwt is set", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/blog/new",
        headers: {
          authorization: `Bearer ${trueToken}`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      blog.isBlogAuthorized(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(200);
      done();
    });

    it("should show 403 if user is not blog authorized", (done) => {
      var req = httpMocks.createRequest({
        method: "POST",
        url: "/api/blog/new",
        headers: {
          authorization: `Bearer ${falseToken}`,
        },
      });
      var res = httpMocks.createResponse();
      var next = function () {};

      blog.isBlogAuthorized(req, res, next);
      var data = res._getStatusCode();
      expect(data).equal(403);
      done();
    });
  });
});
