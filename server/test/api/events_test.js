const Event = require("../../src/models/Event");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../src/app");

chai.use(chaiHttp);

afterEach((done) => {
  Event.remove().then(() => done());
})

describe("/GET events", () => {
  it("should return all events", (done) => {
    chai.request(app)
      .get("/api/events")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  })
});

describe('/GET/:id Event', () => {
  it("should return a single event if id is correct", (done) => {
    let event = new Event({
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    });
    event.save((err, event) => {
      chai.request(app)
        .get("/api/events/" + event._id)
        .send(event)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('eventName').eql("Test event");
          res.body.should.have.property('description').eql("Test description");
          res.body.should.have.property('venue').eql("Test venue");
          res.body.should.have.property('date').eql("Test date");
          res.body.should.have.property('graduationYear').eql("Test graduation year");
          done();
        })
    })
  });
});

describe("PUT/:id events", () => {
  it("updates event with given id", (done) => {
    let event = {
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    };
    let updatedEvent ={
      eventName: "Test new event",
      description: "Test new description",
      venue: "Test new venue",
      date: "Test new date",
      graduationYear: "Test new graduation year"
    }
    let newEvent = new Event(event);
    newEvent.save((err, event) => {
      chai.request(app)
        .put("/api/events/" + event._id)
        .send(updatedEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property("id");
          done();
        })
    })
  })
});

describe("DELETE/:id events", () => {
  it("should delete event with given id", (done) => {
    let event = {
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    };
    let newEvent = new Event(event);
    newEvent.save((err, event) => {
      chai.request(app)
        .delete("/api/events/" + event._id)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        })
    })
  })
})