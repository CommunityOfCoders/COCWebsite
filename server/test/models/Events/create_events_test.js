const assert = require("assert");
const Event = require("../../../src/models/Event");

describe('Testing Events', () => {
  it('creates an event', (done) => {
    let event = {
      eventName: "Test event",
      description: "Test description",
      venue: "Test venue",
      date: "Test date",
      graduationYear: "Test graduation year"
    };

    const newEvent = new Event(event);
    newEvent.save().then((event) => {
      assert(!newEvent.isNew);
      assert(event.eventName === "Test event");
      assert(event.description === "Test description");
      assert(event.venue === "Test venue");
      assert(event.date === "Test date");
      assert(event.graduationYear === "Test graduation year");
      done();
    })
  });
})