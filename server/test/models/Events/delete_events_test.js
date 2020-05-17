const assert = require('assert');
const Event = require("../../../src/models/Event");

let event;


describe("Delete Events", () => {

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
  

  it("finds Event with matching name", (done) => {
    Event.findOneAndDelete({ eventName: "Test event" })
      .then((returnedEvent) => {
        assert(returnedEvent !== null);
        assert(returnedEvent.description === event.description);
        assert(returnedEvent.venue === event.venue);
        assert(returnedEvent.date === event.date);
        assert(returnedEvent.graduationYear === event.graduationYear);
        done();
      });
  });

  it("finds Event with matching description", (done) => {
    Event.findOneAndDelete({ description: "Test description" })
      .then((returnedEvent) => {
        assert(returnedEvent !== null);
        assert(returnedEvent.eventName === event.eventName);
        assert(returnedEvent.venue === event.venue);
        assert(returnedEvent.date === event.date);
        assert(returnedEvent.graduationYear === event.graduationYear);
        done();
      });
  });

  it("finds Event with matching venue", (done) => {
    Event.findOneAndDelete({ venue: "Test venue" })
      .then((returnedEvent) => {
        assert(returnedEvent !== null);
        assert(returnedEvent.description === event.description);
        assert(returnedEvent.eventName === event.eventName);
        assert(returnedEvent.date === event.date);
        assert(returnedEvent.graduationYear === event.graduationYear);
        done();
      });
  });

  it("finds Event with matching date", (done) => {
    Event.findOneAndDelete({ date: "Test date" })
      .then((returnedEvent) => {
        assert(returnedEvent !== null);
        assert(returnedEvent.description === event.description);
        assert(returnedEvent.venue === event.venue);
        assert(returnedEvent.eventName === event.eventName);
        assert(returnedEvent.graduationYear === event.graduationYear);
        done();
      });
  });

  it("finds Event with matching graduation year", (done) => {
    Event.findOneAndDelete({ graduationYear: "Test graduation year" })
      .then((returnedEvent) => {
        assert(returnedEvent !== null);
        assert(returnedEvent.description === event.description);
        assert(returnedEvent.venue === event.venue);
        assert(returnedEvent.date === event.date);
        assert(returnedEvent.eventName === event.eventName);
        done();
      });
  });
  
})