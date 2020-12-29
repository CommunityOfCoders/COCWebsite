module.exports = {
  getAlumniDetails(req, res) {
    // No idea what we are going to get
    console.log(req.body);
    res.status(200).json({ Status: "OK" });
  },
};
