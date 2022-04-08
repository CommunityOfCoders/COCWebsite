const mongoose = require("mongoose");

const company = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    url: String,
    public_id: String,
  },
});

const Company = mongoose.model("company", company);

module.exports = Company;
