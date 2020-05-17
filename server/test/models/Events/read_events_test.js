const assert = require('assert');
const Event = require("../../../src/models/Event");

let event;

describe("Reading events", () => {

  beforeEach((done) => {
    event = new Event({
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    });
    event.save().then(() => done());
  });  

  it("finds event with matching eventName", (done) => {
    Event.findOne({ eventName: "Test event" })
      .then((event) => {
        assert(event != null);
        done();
      });
  });

  it("finds event with matching description", (done) => {
    Event.findOne({ description: "Test description" })
      .then((event) => {
        assert(event != null);
        done();
      });
  });

  it("finds event with matching venue", (done) => {
    Event.findOne({ venue: "Test venue" })
      .then((event) => {
        assert(event != null);
        done();
      });
  });

  it("finds event with matching date", (done) => {
    Event.findOne({ date: "Test date" })
      .then((event) => {
        assert(event != null);
        done();
      });
  });

  it("finds event with matching graduationYear", (done) => {
    Event.findOne({ graduationYear: "Test graduation year" })
      .then((event) => {
        assert(event != null);
        done();
      });
  });
})