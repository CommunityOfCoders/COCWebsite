const Alumnus = require('../models/Alumnus');
const replaceDriveURL = require('../utility/replaceDriveURL');

module.exports = {
  async createAlumnus(req, res, next) {
    // Shape of Data
    /*
    {
      Timestamp: [ '2/3/2021 14:07:55' ],
      'Current Company/Institute Name': [ 'VJTI' ],
      'Full Github Profile URL': [ 'https://github.com/ShubhankarKG' ] // Optional,
      'Full Profile URL (portfolio)': [ 'https://abc.xyz' ] // Optional,
      '': [ '' ],
      'Full Twitter Profile URL': [ 'https://twitter.com/ShubhankarKG' ] // Optional,
      'Current Professional Title': [ 'Student' ],
      'Email Address': [ 'shubhankar.gupto.11@gmail.com' ],
      'Full Instagram Profile URL': [ '' ] // Optional,
      'Full Facebook Profile URL': [ '' ] // Optional,
      'Last Name': [ 'Gupta' ],
      'Graduation Year': [ '2022' ],
      'Current Work City': [ 'badlapur' ],
      'First Name': [ 'Shubhankar' ],
      'Full LinkedIn Profile URL': [ 'None' ] // Optional,
      'Profile Image': [
        'https://drive.google.com/open?id=179e1u3bsbwolEv0bgEBEbz25zLjN10gp'
      ]
    }
    */
    try {
      const body = req.body;
      // Compulsory stuff
      let alumnus = {
        fullName: body["First Name"][0] + " " + body["Last Name"][0],
        email: body["Email Address"][0],
        city: body["Current Work City"][0],
        graduationYear: body["Graduation Year"][0],
        imageUrl: replaceDriveURL(body["Profile Image"][0]),
        company: body["Current Company/Institute Name"][0],
        professionalTitle: body["Current Professional Title"][0],
      }

      // Optional stuff
      alumnus["socialUrls"] = {};
      if (body["Full Github Profile URL"] && body["Full Github Profile URL"].length > 0) {
        alumnus["socialUrls"]["github"] = body["Full Github Profile URL"][0];
      }
      if (body["Full LinkedIn Profile URL"] && body["Full LinkedIn Profile URL"].length > 0) {
        alumnus["socialUrls"]["linkedin"] = body["Full LinkedIn Profile URL"][0];
      }
      if (body["Full Twitter Profile URL"] && body["Full Twitter Profile URL"].length > 0) {
        alumnus["socialUrls"]["twitter"] = body["Full Twitter Profile URL"][0];
      }
      if (body["Full Instagram Profile URL"] && body["Full Instagram Profile URL"].length > 0) {
        alumnus["socialUrls"]["instagram"] = body["Full Instagram Profile URL"][0];
      }
      if (body["Full Facebook Profile URL"] && body["Full Facebook Profile URL"].length > 0) {
        alumnus["socialUrls"]["instagram"] = body["Full Facebook Profile URL"][0];
      }
      if (body["Full Profile URL (portfolio)"] && body["Full Profile URL (portfolio)"].length > 0) {
        alumnus["socialUrls"]["personal"] = body["Full Profile URL (portfolio)"][0];
      }
      await Alumnus.create(alumnus);
      // console.log(req.body);
      res.status(200).json({ Status: "OK" });
      next();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }

  },
  async allAlumni(_, res, next) {
    try {
      const alumni = await Alumnus.find({}).lean();
      res.locals.cache = alumni;
      res.status(200).json({ alumni });
      next();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};
