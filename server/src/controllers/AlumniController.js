module.exports = {
  getAlumniDetails(req, res) {
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
    console.log(req.body);
    res.status(200).json({ Status: "OK" });
  },
};
