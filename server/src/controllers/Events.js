const format = require("date-fns/format")
const path = require("path");
const cloudinary = require("cloudinary");
const scheduler = require("../utility/scheduler");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const Event = require("../models/Event");
const User = require("../models/User");
const sendEmail = require("../utility/sendEmail");
const ejs = require("ejs");
const getBaseURL = require("../utility/getBaseURL");
const { validationResult } = require('express-validator/check');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getNotificationDate = (eventDate) => {
  return new Date(
    parseInt(eventDate[3]),
    months.indexOf(eventDate[1]),
    parseInt(eventDate[2]),
    3
  ); // Sends notification at 08:30 IST at the day of the event
};

// Utility function to ensure some value is always returned
const numUsers = (event) => {
  if (!!event.registeredUsers) {
    return event.registeredUsers.length;
  }
  return 0;
};

// Utility function to send mail to users
const sendMailToUsers = async (event, selectedUsers) => {
  const mailSubject = "Community Of Coders,VJTI - New Event Published";
  const link = `${getBaseURL()}/events/${event._id}`;
  const dateTime = format(new Date(event.date), 'dd-MM-yyyy hh:mm aaa').split(" ")
  event.day = dateTime[0]
  event.time = dateTime[1] + " " + dateTime[2];
  for (let i = 0; i < selectedUsers.length; i++) {
    const mailData = await ejs.renderFile(path.resolve(__dirname, "../views", "eventRsvp.ejs"),
      { event, user: selectedUsers[i], link }
    );
    await sendEmail(selectedUsers[i].email, mailSubject, mailData);
  }

}

module.exports = {
  async getEvents(_req, res, next) {
    const events = await Event.find()
      .populate({
        path: "users",
        select: ["_id"],
      })
      .sort("-date")
      .lean();
    const countAddedEvents = events.map((event) => ({
      ...event,
      count: numUsers(event),
    }));
    res.locals.cache = countAddedEvents;
    next();
    res.status(200).json(countAddedEvents);
  },

  async getEventById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const eventId = req.params.id;
      let event = await Event.findById(eventId)
        .populate({
          path: "users",
          select: "_id",
        })
        .lean();
      event = { ...event, count: numUsers(event) };
      res.status(200).json(event);
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
  async uploadEvent(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const file = req.file;
      let event = await Event.create(req.body);
      if (file) {
        const image = await cloudinary.v2.uploader.upload(file.path, {
          public_id: event._id,
          tags: ["event"],
          invalidate: true,
        });
        event = await Event.findByIdAndUpdate(
          event._id,
          { image: { url: image.secure_url, public_id: image.public_id } },
          { new: true }
        ).select({ "_id": 1, "eventName": 1, "description": 1, "venue": 1, "date": 1 }).lean();
      }
      res.status(200).json({
        id: event._id,
      });
      const startYear = req.body.graduationYearFrom;
      const endYear = req.body.graduationYearTo;
      const users = await User.find({
        $and: [
          {graduationYear: {$gte: startYear}},
          {graduationYear: {$lte: endYear}}
        ]
      });
      sendMailToUsers(event, users);
      next();
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },
  async updateEvent(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const eventId = req.params.id;
      const file = req.file;
      const event = await Event.findByIdAndUpdate(
        eventId,
        req.body,
        { new: true }
      ).lean();
      const eventDate = event.date.split("-");
      const notificationDate = getNotificationDate(eventDate[0].split(" "));
      scheduler.rescheduleNotification(notificationDate, { prefix: eventId });
      if (file) {
        try {
          await cloudinary.api.resource(eventId);
          try {
            await cloudinary.v2.uploader.destroy(eventId);
          } catch (error) {
            res.status(500).json({});
          }
        } catch (error) { }
        const image = await cloudinary.v2.uploader.upload(file.path, {
          public_id: eventId,
          tags: ["event"],
          invalidate: true,
        });
        req.body.image = {
          url: image.secure_url,
          public_id: image.public_id,
        };
      }
      res.status(200).json(event);
      next();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  async deleteEvent(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const eventId = req.params.id;
    scheduler.removeNotification({ substring: eventId });
    await Event.findByIdAndDelete(eventId).lean();
    try {
      await cloudinary.api.resource(eventId);
      try {
        await cloudinary.v2.uploader.destroy(eventId);
      } catch (error) {
        res.status(500).json({
          error: error.message,
        });
      }
    } catch (error) { }
    res.status(204).json({});
    next();
  },

  async addForm(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const formURL = req.body.formURL;
    const eventId = req.params.id;

    try {
      await Event.findByIdAndUpdate(eventId, {
        form: formURL,
      }).lean();

      res.status(200).send({
        message: "Form added successfully",
      });
    } catch (err) {
      res.status(403).send({
        error: err,
      });
    }
  },

  async registerUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { uid, eid } = req.query;
      const event = await Event.findById(eid).populate({
        path: "users",
        select: ["_id"],
      });
      if (!event) {
        return res.status(404).json({ error: "Requested event not found" });
      }
      const user = await User.findById(uid);
      if (!user) {
        return res.status(404).json({ error: "Requested user not found" });
      }
      if (!event.registeredUsers.includes(uid)) {
        event.registeredUsers.push(uid);
      }
      await event.save();
      const eventDate = event.date.split("-");
      const notificationDate = getNotificationDate(eventDate[0].split(" "));
      const userEmail = user.email;
      const mailData = await ejs.renderFile(path.resolve(__dirname, "../views", "eventReminder.ejs"),
        { event, user })
      const data = {
        jobName: `${eid}-${userEmail}`,
        to: userEmail,
        subject: `${event.eventName} Reminder!!`,
        message: mailData,
      };
      scheduler.scheduleEmailNotification(notificationDate, data);
      next();
      return res.status(200).json({ data: "User registered!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async unregisterUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { uid, eid } = req.query;
      const event = await Event.findById(eid).populate({
        path: "users",
        select: ["_id"],
      });
      if (!event) {
        return res.status(404).json({ error: "Requested event not found" });
      }
      const user = await User.findById(uid).select({ "_id": 1, "email": 1 }).lean();
      if (!user) {
        return res.status(404).json({ error: "Requested user not found" });
      }
      let i = 0;
      while (i < event.registeredUsers.length) {
        if (event.registeredUsers[i].toString() === uid) {
          event.registeredUsers.splice(i, 1);
        } else {
          ++i;
        }
      }
      await event.save();
      scheduler.removeNotification({ substring: `${eid}-${user.email}` });
      next();
      return res.status(200).json({ data: "User unregistered!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
