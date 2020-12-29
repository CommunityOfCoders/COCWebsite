const mongoose = require("mongoose");

const resource = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
});

const topic = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resources: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource",
      },
    ],
    default: [],
    required: false,
  },
});

const Resource = mongoose.model("resource", resource);
const Topic = mongoose.model("topic", topic);

module.exports = { Resource, Topic };
