const assert = require('assert');
const Glimpses = require("../../../src/models/GLimpses");

describe('Testing Glimpses', () => {
  it('creates a glimpse', (done) => {
    const glimpse = new Glimpses({ eventName: "test Name", imagePath: "some string" });
  
    glimpse.save()
      .then(() => {
        assert(!glimpse.isNew);
        done();
      });
  });
})