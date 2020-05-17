const assert = require('assert');
const Glimpses = require("../../../src/models/GLimpses");

describe("Deleting glimpses", () => {
  let glimpse;

  beforeEach((done) => {
    glimpse = new Glimpses({ eventName: "Test event" });
    glimpse.save().then(() => done());
  });

  it("removes a glimpse", (done) => {
    Glimpses.findOneAndDelete({ eventName: "Test event" })
      .then(() => Glimpses.findOne({ eventName: "Test event" }))
      .then((returnedGlimpse) => {
        assert(glimpse.eventName === returnedGlimpse.eventName);
        done();
      });
  });

})