const Glimpse = require("../../src/models/GLimpses");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const app = require("../../src/app");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Glimpses", () => {
  afterEach((done) => {
    Glimpse.remove().then(() => done());
  });

  describe("/POST glimpses addPhotos", () => {
    it("returns 201 to add a glimpse", (done) => {
      let glimpse = new Glimpse({
        eventName: "WebDevWorkshop",
        albumPath: "/path/to/some/file",
      });

      chai
        .request(app)
        .post("/api/glimpses/new")
        .send(glimpse)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(201);
          res.body.should.be.an("object");
          res.body.should.have.property("glimpse");
          res.body.glimpse.should.have.property("_id").not.eql("");
          res.body.glimpse.should.have
            .property("albumPath")
            .eql(glimpse.albumPath);
          res.body.glimpse.should.have
            .property("eventName")
            .eql(glimpse.eventName);
          done();
        });
    });

    it("returns 400 to incomplete eventName in a glimpse", (done) => {
      let glimpse = new Glimpse({
        albumPath: "/path/to/some/file",
      });

      chai
        .request(app)
        .post("/api/glimpses/new")
        .send(glimpse)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("error").eql("Incomplete eventName");
          done();
        });
    });

    it("returns 400 to incomplete albumPath in a glimpse", (done) => {
      let glimpse = new Glimpse({
        eventName: "COCWebDevWorkshop",
      });

      chai
        .request(app)
        .post("/api/glimpses/new")
        .send(glimpse)
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("error").eql("Incomplete albumPath");
          done();
        });
    });

    it("returns 422 to already existing glimpse", (done) => {
      let glimpse = new Glimpse({
        eventName: "COCWebDevWorkshop",
        albumPath: "/path/to/some/file",
      });
      let newGlimpse = new Glimpse({
        eventName: "COCWebDevWorkshop23",
        albumPath: "/path/to/some/file",
      });

      glimpse.save().then(
        chai
          .request(app)
          .post("/api/glimpses/new")
          .send(newGlimpse)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(422);
            res.body.should.be.an("object");
            res.body.should.have
              .property("error")
              .eql("Glimpse already exists");
            done();
          })
      );
    });
  });

  describe("/GET glimpses", () => {
    beforeEach((done) => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        let objToInsert = {
          albumPath: `/var/www/html/${i}`,
          eventName: `Test Glimpse ${i}`,
        };
        data.push(objToInsert);
      }
      Glimpse.insertMany(data)
        .then(() => done())
        .catch((e) => console.log(e));
    });

    it("should return all glimpses", (done) => {
      chai
        .request(app)
        .get("/api/glimpses")
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("data");
          res.body.data.should.be.an("array");
          expect(res.body.data).to.have.lengthOf(10);
          done();
        });
    });

    it("should preserve glimpse object properties", (done) => {
      chai
        .request(app)
        .get("/api/glimpses")
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.data[0].should.be.an("object");
          res.body.data[0].should.have
            .property("albumPath")
            .eql("/var/www/html/0");
          res.body.data[0].should.have
            .property("eventName")
            .eql("Test Glimpse 0");
          done();
        });
    });
  });

  describe("/GET/:id Glimpse", () => {
    it("should return a single glimpse if id is correct", (done) => {
      let glimpse = new Glimpse({
        albumPath: "/var/www/html",
        eventName: "test glimpse 0",
      });
      glimpse.save((err, event) => {
        if (err) throw err;
        chai
          .request(app)
          .get("/api/glimpses/" + event._id)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("glimpse");
            res.body.glimpse.should.have
              .property("albumPath")
              .eql("/var/www/html");
            res.body.glimpse.should.have
              .property("eventName")
              .eql("test glimpse 0");
            done();
          });
      });
    });
  });

  describe("PUT/:id glimpses", () => {
    it("updates glimpse with given id", (done) => {
      let glimpse = {
        albumPath: "/var/www/html",
        eventName: "Test glimpse 1",
      };
      let updatedGlimpse = {
        albumPath: "/var/www/html",
        eventName: "Test glimpse 2",
      };
      let newGlimpse = new Glimpse(glimpse);
      newGlimpse.save((err, glimpse) => {
        if (err) throw err;
        chai
          .request(app)
          .put("/api/glimpses/edit/" + glimpse._id)
          .send(updatedGlimpse)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.glimpse.should.have.property("eventName").eql("Test glimpse 2");
            res.body.glimpse.should.have.property("_id");
            expect(res.body).to.not.be.empty;
            done();
          });
      });
    });
  });

  describe("DELETE/:id glimpses", () => {
    it("should delete glimpse with given id", (done) => {
      let glimpse = {
        albumPath: "/var/www/html",
        eventName: "Test glimpse 1",
      };
      let newGlimpse = new Glimpse(glimpse);
      newGlimpse.save((err, glimpse) => {
        if (err) throw err;
        chai
          .request(app)
          .delete("/api/glimpses/delete/" + glimpse._id)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(204);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });
  });
});
