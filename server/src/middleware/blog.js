const jwt = require("jsonwebtoken");
const config = require("../config");
const Blog = require("../models/Blog");

module.exports = {
  async isBlogAuthorized(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, config.privateKey);
      if (decodedToken.user.isBlogAuthorized) return next();
      else return res.status(403).json({ error: "Blog not authorized" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
    // req.flash('error_msgs', 'Please log in to access this page');
  },

  async isBlogWritten(req, res, next) {
    const { id } = req.params;
    const blog = await Blog.findById(id).select({"authorID":1}).lean();
    if (blog.authorID.toString() === req.userID) {
      next();
    } else {
      return res.status(403).json({ error: "You have not written this blog!" });
    }
  },
};
