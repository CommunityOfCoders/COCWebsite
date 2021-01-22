const Alumnus = require("../models/Alumnus");
const replaceDriveURL = require("../utility/replaceDriveURL");
const redis_client = require("../config/redis");

module.exports = {
  async createAlumnus(req, res) {
    // Shape of Data
    /*
    {
      Timestamp: [ '12/29/2020 17:07:24' ],
      'Full Name': [ 'SKG2' ],
      'Profile URL (social media, portfolio, etc)': [ 'google.com' ],
      'Current Work Location': [ 'Matunga' ],
      'Email Address': [ 'shubhankar.gupto.11@gmail.com' ],
      'Graduation Year': [ '2022' ]
    }
    */
    try {
      const body = req.body;
      let imageUrl = "";
      if (!!body["Profile Image"] && body["Profile Image"].length > 0) {
        imageUrl = replaceDriveURL(body["Profile Image"][0]);
      }
      const alumnus = {
        fullName: body["Full Name"][0],
        email: body["Email Address"][0],
        city: body["Current Work City"][0],
        graduationYear: body["Graduation Year"][0],
        profileUrl: body["Profile URL (social media, portfolio, etc)"][0],
        company: body["Current Company/Institute Name"][0],
        professionalTitle: body["Current Professional Title"][0],
      };
      if (!!imageUrl) {
        alumnus["imageUrl"] = imageUrl;
      }
      await Alumnus.create(alumnus);
      // console.log(req.body);
      res.status(200).json({ Status: "OK" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  async allAlumni(_, res) {
    try {
      const alumni = await Alumnus.find({});
      redis_client.setex("alumni", 3600, alumni);
      return res.status(200).json({ alumni });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
