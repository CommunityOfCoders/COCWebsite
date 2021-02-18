const mongoose = require("mongoose");

const event = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  // form: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'registerForm'
  // }
  form: {
    type: String,
  },
  registeredUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    required: false,
    default: [],
  },
});

const Event = mongoose.model("events", event);

module.exports = Event;
