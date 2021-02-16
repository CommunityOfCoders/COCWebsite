const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary");
const scheduler = require("../utility/scheduler");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const Event = require("../models/Event");
const mongoose = require("mongoose");
const User = require("../models/User");
const sendEmail = require("../utility/sendEmail");

const getNotificationDate = (eventDate) => {
  return new Date(
    parseInt(eventDate[0]),
    parseInt(eventDate[1]) - 1,
    parseInt(eventDate[2]),
    9
  ); // Sends notification at 09:00 at the day of the event
};

// Utility function to ensure some value is always returned
const numUsers = (event) => {
  if (!!event.users) {
    return event.users.length;
  }
  return 0;
};

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
    res.locals.cache = events;
    next();
    res.status(200).json(countAddedEvents);
  },

  async getEventById(req, res) {
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
    try {
      const file = req.file;
      const { graduationYear } = req.body;
      if (!graduationYear.match(/^[12]0[1-5]\d$/)) {
        return res.status(400).json({ error: "Graduation Year must be valid" });
      }
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
        ).select({ "_id": 1 }).lean();
      }
      res.status(200).json({
        id: event._id,
      });
      const users = await User.find();
      // Need to change the subject and body
      users.forEach(async u => {
        const data = `Check the new event out: http://localhost:3000/events/`;
        await sendEmail(u.email, `New Event ${event.eventName} is here`, data);
      });
      next();
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },
  async updateEvent(req, res, next) {
    try {
      const eventId = req.params.id;
      const file = req.file;
      const { graduationYear } = req.body;
      if (!!graduationYear && !graduationYear.match(/^[12]0[1-5]\d$/)) {
        return res.status(400).json({ error: "Graduation Year must be valid" });
      }
      const event = await Event.findByIdAndUpdate(
        eventId,
        req.body,
        { new: true }
      ).lean();
      const eventDate = event.date.split("-");
      const notificationDate = getNotificationDate(eventDate);
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
  async addReminder(req, res) {
    try {
      const eventId = req.body.id;
      const userEmail = req.body.email;
      const event = await Event.findById(eventId).select({ "eventName": 1, "date": 1 }).lean();
      const eventDate = event.date.split("-");
      const notificationDate = getNotificationDate(eventDate);
      const data = {
        jobName: `${eventId}-${userEmail}`,
        to: userEmail,
        subject: `${event.eventName} Reminder!!`,
        message: `Reminder email for ${event.eventName} event`,
      };
      scheduler.scheduleEmailNotification(notificationDate, data);
      res.status(200).json({ mssg: "Successfully added reminder" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async cancelReminder(req, res) {
    const eventId = req.params.id;
    const userEmail = req.body.email;
    try {
      scheduler.removeNotification({ substring: `${eventId}-${userEmail}` });
      res.status(200).json({ mssg: "Successfully cancelled reminder" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async registerUser(req, res) {
    try {
      const { uid, eid } = req.query;
      const event = await Event.findById(eid).populate({
        path: "users",
        select: ["_id"],
      });
      console.log(event);
      if (!event) {
        return res.status(404).json({ error: "Requested event not found" });
      }
      const user = await User.exists({ _id: uid });
      if (!user) {
        return res.status(404).json({ error: "Requested user not found" });
      }
      if (!event.registeredUsers.includes(uid)) {
        event.registeredUsers.push(uid);
      }
      await event.save();
      return res.status(200).json({ data: "User registered!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async unregisterUser(req, res) {
    try {
      const { uid, eid } = req.query;
      console.log(uid, eid);
      const event = await Event.findById(eid).populate({
        path: "users",
        select: ["_id"],
      });
      console.log(event);
      if (!event) {
        return res.status(404).json({ error: "Requested event not found" });
      }
      const user = await User.exists({ _id: uid });
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
      return res.status(200).json({ data: "User unregistered!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
