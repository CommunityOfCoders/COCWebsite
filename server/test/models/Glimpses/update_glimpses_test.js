const assert = require('assert');
const Glimpses = require("../../../src/models/GLimpses");

describe("Updating a glimpse", () => {
  let glimpse;

  beforeEach((done) => {
    glimpse = new Glimpses({ eventName: "Test event" });
    glimpse.save().then(() => done());
  });

  function assertHelper(statement, done) {
    statement
      .then(() => Glimpses.find())
      .then((glimpse) => {
        assert(glimpse !== null);
        assert(glimpse[0].eventName === "Test Event Changed");
        done();
      });
  }

  it('update one glimpse using model', (done) => {
    assertHelper(Glimpses.findOneAndUpdate({ eventName: 'Test event' }, { eventName: 'Test Event Changed' }), done);
  });

})