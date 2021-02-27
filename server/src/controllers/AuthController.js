const User = require("../models/User");
const passwordhasher = require("password-hasher");
const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require("crypto");
const sendEmail = require("../utility/sendEmail");
const ejs = require("ejs");
const path = require("path");
const getBaseURL = require("../utility/getBaseURL");
const { validationResult } = require('express-validator/check');

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { password, username } = req.body;

      const user1 = await User.findOne({
        username: username,
      }).lean().select({ "username": 1 });

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

      const token = jwt.sign({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          isMember: user.isMember,
          isBlogAuthorized: user.isBlogAuthorized
        }
      }, config.privateKey, {
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { username, password, rememberme } = req.body;

      const user = await User.findOne({
        username: username,
      }).select({
        "_id": 1,
        "username": 1,
        "email": 1,
        "password": 1,
        "isMember": 1,
        "isBlogAuthorized": 1
      }).lean();

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

      return res.status(200).json({
        username: user.username,
        token: token,
        userID: user._id,
        rememberme: rememberme
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async verifyToken(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      let userID = "";
      let username = "";
      if (!!req.body.userID) {
        userID = req.body.userID;
      }
      if (!!req.body.username) {
        username = req.body.username;
      }

      let user;
      if (!!userID) {
        user = await User.findOne({
          _id: userID,
        }).lean();
      } else {
        user = await User.findOne({
          username: username,
        }).lean();
      }
      if (!!user) {
        user.password = null;
      }
      res.status(200).json(user);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({
        error: e.message,
      });
    }
  },

  async forgotPassword(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");
        user.passwordResetToken = token;
        user.passwordResetTokenTime = Date.now() + 60 * 60 * 1000;
        await user.save();
        try {
          const baseURL = getBaseURL();
          const data = await ejs.renderFile(
            path.join(__dirname, "../views/forgotPassword.ejs"),
            {
              username: user.username,
              link: `${baseURL}/newpass/${token}`,
            }
          );
          await sendEmail(user.email, "Password Reset", data);
          return res.status(200).json({ message: "Email sent" });
        } catch (error) {
          return res
            .status(500)
            .json({ error: "Unable to send email : " + error.message });
        }
      } else {
        return res.status(404).json({ error: "User does not exist!" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async newPassword(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    
    try {
      const { newPassword, token } = req.body;
      let user = await User.findOne({
        passwordResetToken: token,
        passwordResetTokenTime: { $gt: Date.now() },
      });
      if (user) {
        const hashedPassword = passwordHash(newPassword);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenTime = undefined;
        await user.save();
        return res.status(200).json({ message: "New password updated" });
      } else {
        return res.status(400).json({ error: "Link expired!" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
