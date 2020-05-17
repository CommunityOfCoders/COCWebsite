const assert = require('assert');
const Event = require("../../../src/models/Event");

let event;
let newEvent;

describe("Updating Events", () => {

  beforeEach((done) => {
    event = new Event({
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    });
    event.save().then(() => {
      done();
    });

    newEvent = {
      eventName: "New Test event",
      description: "New Test description",
      venue: "New Test venue",
      date: "New Test date",
      graduationYear: "New Test graduation year"
    };
  });

  it("finds event with matching title", (done) => {
    Event.findOneAndUpdate({ eventName: "Test event" }, newEvent)
      .then(() => Event.find())
      .then((event) => {
        assert(event !== null);
        assert(event[0].eventName === "New Test event");
        assert(event[0].description === "New Test description");
        assert(event[0].venue === "New Test venue");
        assert(event[0].date === "New Test date");
        assert(event[0].graduationYear === "New Test graduation year");
        done();
      });
  });

  it("finds Event with matching description", (done) => {
    Event.findOneAndUpdate({ description: "Test description" }, newEvent)
      .then(() => Event.find())
      .then((event) => {
        assert(event !== null);
        assert(event[0].eventName === "New Test event");
        assert(event[0].description === "New Test description");
        assert(event[0].venue === "New Test venue");
        assert(event[0].date === "New Test date");
        assert(event[0].graduationYear === "New Test graduation year");
        done();
      });
  });

  it("finds Event with matching venue", (done) => {
    Event.findOneAndUpdate({ venue: "Test venue" }, newEvent)
      .then(() => Event.find())
      .then((event) => {
        assert(event !== null);
        assert(event[0].eventName === "New Test event");
        assert(event[0].description === "New Test description");
        assert(event[0].venue === "New Test venue");
        assert(event[0].date === "New Test date");
        assert(event[0].graduationYear === "New Test graduation year");
        done();
      });
  });

  it("finds Event with matching date", (done) => {
    Event.findOneAndUpdate({ date: "Test date" }, newEvent)
      .then(() => Event.find())
      .then((event) => {
        assert(event !== null);
        assert(event[0].eventName === "New Test event");
        assert(event[0].description === "New Test description");
        assert(event[0].venue === "New Test venue");
        assert(event[0].date === "New Test date");
        assert(event[0].graduationYear === "New Test graduation year");
        done();
      });
  });

  it("finds Event with matching graduation year", (done) => {
    Event.findOneAndUpdate({ graduationYear: "Test graduation year" }, newEvent)
      .then(() => Event.find())
      .then((event) => {
        assert(event !== null);
        assert(event[0].eventName === "New Test event");
        assert(event[0].description === "New Test description");
        assert(event[0].venue === "New Test venue");
        assert(event[0].date === "New Test date");
        assert(event[0].graduationYear === "New Test graduation year");
        done();
      });
  });

})