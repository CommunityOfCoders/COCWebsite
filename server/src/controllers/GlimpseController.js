require("dotenv").config();
const axios = require("axios");
const Glimpses = require("../models/GLimpses");
const extractPhotos = require("../utility/extractPhotos");

module.exports = {
  async getPhotos(req, res) {
    const { photosURL } = req.body;
    const response = await axios.get(photosURL);
    res.status(200).json(extractPhotos(response.data));
  },

  async getAllGlimpses(req, res) {
    try {
      const glimpses = await Glimpses.find({});
      const imageUrls = glimpses.map((glimpse) => glimpse.albumPath);
      console.log(imageUrls);
      const response = await axios.all(imageUrls.map((url) => axios.get(url)));
      let returnArr = [];
      for (let i = 0; i < glimpses.length; i += 1) {
        const result = extractPhotos(response[i].data)[0];
        const modObj = {
          ...glimpses[i]["_doc"],
          preview: result,
        };
        returnArr.push(modObj);
      }
      return res.status(200).json({ data: returnArr });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async getGlimpse(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "Glimpse does not exist" });
    }
    try {
      const glimpse = await Glimpses.findById(id);
      return res.status(200).json({ glimpse });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async addGlimpse(req, res) {
    const { albumPath, eventName } = req.body;
    if (!albumPath) {
      return res.status(400).json({ error: "Incomplete albumPath" });
    }
    if (!eventName) {
      return res.status(400).json({ error: "Incomplete eventName" });
    }

    // Check on albumPath because Eventnames shall be same over a period of time
    const existingGlimpse = await Glimpses.findOne({ albumPath });
    if (!!existingGlimpse) {
      return res.status(422).json({ error: "Glimpse already exists" });
    }

    const newGlimpse = { albumPath, eventName };
    try {
      const glimpse = await Glimpses.create(newGlimpse);
      return res.status(201).json({ glimpse });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async editGlimpse(req, res) {
    const { albumPath, eventName } = req.body;
    const { id } = req.params;

    const newGlimpse = { albumPath, eventName };
    try {
      const glimpse = await Glimpses.findByIdAndUpdate(id, newGlimpse, {
        new: true,
      });
      return res.status(200).json({ glimpse });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async deleteGlimpse(req, res) {
    const { id } = req.params;

    try {
      await Glimpses.findByIdAndDelete(id);
      return res.status(204).json({});
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
