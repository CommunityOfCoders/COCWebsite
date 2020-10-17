const Event = require("../../src/models/Event");
const scheduler = require("../../src/utility/scheduler");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../src/app");
const jwt = require("jsonwebtoken");
const config = require("../../src/config");
const should = chai.should();

chai.use(chaiHttp);

describe("Events", () => {
  afterEach((done) => {
    Event.remove().then(() => done());
  });

  describe("/GET events", () => {
    beforeEach((done) => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        let objToInsert = {
          eventName: "Test event " + i,
          description: "Test description " + i,
          venue: "Test venue " + i,
          date: "Test date " + i,
          graduationYear: "Test graduation year " + i,
        };
        data.push(objToInsert);
      }
      Event.insertMany(data)
        .then(() => done())
        .catch((e) => console.log(e));
    });

    it("should return all events", (done) => {
      chai
        .request(app)
        .get("/api/events")
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.an("array");
          expect(res.body).to.have.lengthOf(10);
          done();
        });
    });

    it("should preserve event object properties", (done) => {
      chai
        .request(app)
        .get("/api/events")
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body[0].should.be.an("object");
          res.body[0].should.have.property("eventName").eql("Test event 0");
          res.body[0].should.have
            .property("description")
            .eql("Test description 0");
          res.body[0].should.have.property("venue").eql("Test venue 0");
          res.body[0].should.have.property("date").eql("Test date 0");
          res.body[0].should.have
            .property("graduationYear")
            .eql("Test graduation year 0");
          done();
        });
    });
  });

  describe("/GET/:id Event", () => {
    it("should return a single event if id is correct", (done) => {
      let event = new Event({
        eventName: "Test event",
        description: "Test description",
        venue: "Test venue",
        date: "Test date",
        graduationYear: "Test graduation year",
      });
      event.save((err, event) => {
        if (err) throw err;
        chai
          .request(app)
          .get("/api/events/" + event._id)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("eventName").eql("Test event");
            res.body.should.have
              .property("description")
              .eql("Test description");
            res.body.should.have.property("venue").eql("Test venue");
            res.body.should.have.property("date").eql("Test date");
            res.body.should.have
              .property("graduationYear")
              .eql("Test graduation year");
            done();
          });
      });
    });
  });

  describe("PUT/:id events", () => {
    let token;

    before(() => {
      token = jwt.sign(
        {
          user: {
            isMember: true,
          },
        },
        config.privateKey,
        {
          expiresIn: 3600,
        }
      );
    });

    it("updates event with given id", (done) => {
      let event = {
        eventName: "Test event",
        description: "Test description",
        venue: "Test venue",
        date: "Test date",
        graduationYear: "Test graduation year",
      };
      let updatedEvent = {
        eventName: "Test new event",
        description: "Test new description",
        venue: "Test new venue",
        date: "Test new date",
        graduationYear: "Test new graduation year",
      };
      let newEvent = new Event(event);
      newEvent.save((err, event) => {
        if (err) throw err;
        chai
          .request(app)
          .put("/api/events/" + event._id)
          .set("Authorization", `Bearer ${token}`)
          .send(updatedEvent)
          .end((error, res) => {
            expect(error).to.be.null;
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.should.have.property("eventName").eql("Test new event");
            res.body.should.have.property("_id");
            expect(res.body).to.not.be.empty;
            done();
          });
      });
    });
  });

  describe("DELETE/:id events", () => {
    let token;

    before(() => {
      token = jwt.sign(
        {
          user: {
            isMember: true,
          },
        },
        config.privateKey,
        {
          expiresIn: 3600,
        }
      );
    });


    it("should delete event with given id", (done) => {
      let event = {
        eventName: "Test event",
        description: "Test description",
        venue: "Test venue",
        date: "Test date",
        graduationYear: "Test graduation year",
      };
      let newEvent = new Event(event);
      newEvent.save((err, event) => {
        if (err) throw err;
        chai
          .request(app)
          .delete("/api/events/" + event._id)
          .set("Authorization", `Bearer ${token}`)
          .end((error, res) => {
            expect(error).to.be.null;
            res.should.have.status(204);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });
  });

  // describe("PUT/ add form url to event", () => {
  //   let formBody, id;

  //   let token;

  //   before(() => {
  //     token = jwt.sign(
  //       {
  //         user: {
  //           isMember: true,
  //         },
  //       },
  //       config.privateKey,
  //       {
  //         expiresIn: 3600,
  //       }
  //     );
  //   });

  //   beforeEach((done) => {
  //     let event = new Event({
  //       eventName: "Test event",
  //       description: "Test description",
  //       venue: "Test venue",
  //       date: "Test date",
  //       graduationYear: "Test graduation year",
  //     });
  //     formBody = {
  //       formURL: "Test form url",
  //     };
  //     event.save((err, savedEvent) => {
  //       if (err) throw err;
  //       id = savedEvent._id;
  //       console.log(`id = ${id}`);
  //       done();
  //     });
  //   });

  //   it("adds form to event body", (done) => {
  //     chai
  //       .request(app)
  //       .put("/api/events/form/" + id)
  //       .set("Authorization", `Bearer ${token}`)
  //       .send(formBody)
  //       .end((err, res) => {
  //         console.log(res);
  //         expect(err).to.be.null;
  //         res.should.have.status(200);
  //         res.body.should.be.an("object");
  //         res.body.should.have.property("message").not.eql("");
  //         done();
  //       });
  //   });

  //   it("does not add form to event body", (done) => {
  //     id = "Wrong-test-id";
  //     chai
  //       .request(app)
  //       .put("/api/events/form/" + id)
  //       .send(formBody)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         res.should.have.status(403);
  //         res.body.should.be.an("object");
  //         res.body.should.have.property("error").not.eql("");
  //         done();
  //       });
  //   });
  // });
  describe("POST/ add email reminder for event", () => {
    it("should add a new job to the scheduler", (done) => {
      let event = {
        eventName: "Test event",
        description: "Test description",
        venue: "Test venue",
        date: "2200-11-31",
        graduationYear: "Test graduation year",
      };
      let newEvent = new Event(event);
      newEvent.save((err, event) => {
        if(err) throw err;
        let reqData = {
          id: event._id,
          email: "test@test.com",
        }
        const jobNumbers = scheduler.getNumberOfJobs();
        chai
        .request(app)
        .post("/api/events/reminder")
        .send(reqData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(jobNumbers).equal(scheduler.getNumberOfJobs() - 1);
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("mssg").eql("Successfully added reminder");
          done();
        });
      });
    });
  });
  describe("DELETE/ cancel email reminder for event", () => {
    it("should cancel a set job in the scheduler", (done) => {
      let event = {
        eventName: "Test event",
        description: "Test description",
        venue: "Test venue",
        date: "2200-11-31",
        graduationYear: "Test graduation year",
      };
      let newEvent = new Event(event);
      newEvent.save((err, event) => {
        if(err) throw err;
        let reqData = {
          email: "test@test.com",
        }
        scheduler
          .scheduleEmailNotification(
            event.date, 
            {
              jobName: `${event._id}-${reqData.email}`,
              to: 'test@test.com',
              subject: `${event.eventName} Reminder!!`,
              message: `Reminder email for ${event.eventName} event`,
            }
          );
        const jobNumbers = scheduler.getNumberOfJobs();
        chai
        .request(app)
        .delete("/api/events/reminder/" + event._id)
        .send(reqData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(jobNumbers).equal(scheduler.getNumberOfJobs() + 1);
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("mssg").eql("Successfully cancelled reminder");
          done();
        });
      });
    });
  });
});
