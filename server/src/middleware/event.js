const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  async isMember(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, config.privateKey);
      if (decodedToken.user.isMember) return next();
      else return res.status(403).json({ error: "You are not authorized" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
