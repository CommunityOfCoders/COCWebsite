const assert = require('assert');
const Glimpses = require("../../../src/models/GLimpses");

let glimpse;

beforeEach((done) => {
  glimpse = new Glimpses({ eventName: "Test event" });
  glimpse.save().then(() => {
    done();
  });
});

describe("Reading glimpses", () => {
  it("finds event with matching name", (done) => {
    Glimpses.findOne({ eventName: "Test event" })
      .then((glimpse) => {
        assert(glimpse != null);
        assert(glimpse.eventName == "Test event");
        assert(glimpse.imagePath == null);
        done();
      });
  })
})