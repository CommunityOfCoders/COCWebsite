require("dotenv").config();
const axios = require("axios");
const extractPhotos = require("../utility/extractPhotos");

module.exports = {
  async getPhotos(_req, res) {
    const response = await axios.get(process.env.GPHOTOSURL);
    res.status(200).json(extractPhotos(response.data));
  },
};
