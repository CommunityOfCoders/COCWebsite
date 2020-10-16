const User = require("../models/User");
const passwordhasher = require("password-hasher");
const jwt = require("jsonwebtoken");
const config = require("../config");

function passwordHash(password) {
  const hash = passwordhasher.createHash(
    "ssha512",
    password,
    new Buffer("83d88386463f0625", "hex")
  );
  const rfcHash = passwordhasher.formatRFC2307(hash);
  return rfcHash;
}
module.exports = {
  async register(req, res) {
    try {
      const { password, username } = req.body;

      const user1 = await User.findOne({
        username: username,
      });

      /* If user exists, return 422 - 
      visit https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists for more details
      */
      if (user1) {
        return res.status(422).json({
          error: "UserName Already Exists",
        });
      }

      req.body.password = passwordHash(password);

      const user = await User.create(req.body);

      const token = jwt.sign({ user: user }, config.privateKey, {
        expiresIn: 3600,
      });

      res.status(201).json({
        username: user.username,
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        username: username,
      });

      // User not found, return 400
      if (!user) {
        return res.status(400).json({
          error: "No user found",
        });
      }

      const rfcHash = passwordHash(password);

      // Password invalid
      if (rfcHash !== user.password) {
        return res.status(401).json({
          error: "Invalid login info",
        });
      }

      const token = jwt.sign({ user: user }, config.privateKey, {
        expiresIn: 60 * 60,
      });

      res.status(200).json({
        username: user.username,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  },

  async verifyToken(req, res) {
    const { token } = req.body;

    try {
      jwt.verify(token, config.privateKey);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(403).json({
        status: false,
      });
    }
  },

  async getUser(req, res) {
    try {
      const { username } = req.body;

      const user = await User.findOne({
        username: username,
      });

      user.password = null;

      res.status(200).json(user);
    } catch (e) {
        res.status(400).json({
          error: e.message
        })
    }
  },
};
