require("dotenv").config();
const User = require("../models/User");
const passwordhasher = require("password-hasher");
const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require("crypto");
const sendEmail = require("../utility/sendEmail");
const ejs = require("ejs");
const path = require("path");
const getBaseURL = require("../utility/getBaseURL");
const { validationResult } = require("express-validator/check");

const SibApiV3Sdk = require("sib-api-v3-sdk");
const apiInstance = require("../config/sib");

function passwordHash(password) {
  const hash = passwordhasher.createHash(
    "ssha512",
    password,
    new Buffer(process.env.PASSWORD_HASH, "hex")
  );
  const rfcHash = passwordhasher.formatRFC2307(hash);
  return rfcHash;
}

// Builds JWT Payload object from user object received from database
const buildJWTPayload = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    isMember: user.isMember,
    isBlogAuthorized: user.isBlogAuthorized,
  };
}

const ACCESS_TOKEN_EXPIRE_TIME = '5m';     // 5 minutes
const REFRESH_TOKEN_EXPIRE_TIME = '365d';  // 365 days

module.exports = {
  async register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { password, email, username } = req.body;

      const user1 = await User.findOne({
        email: email,
      })
        .lean()
        .select({ username: 1 });

      if (user1) {
        return res.status(422).json({
          error: "Email Already Registered",
        });
      }

      const user2 = await User.findOne({
        email: email,
      })
        .lean()
        .select({ username: 1 });

      /* If user exists, return 422 -
      visit https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists for more details
      */
      if (user2) {
        return res.status(422).json({
          error: "UserName Already Exists",
        });
      }

      req.body.password = passwordHash(password);

      const user = await User.create(req.body);

      if (process.env.NODE_ENV === 'production') {
        var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
        createContact = { email: user.email };
        apiInstance.createContact(createContact).then(
          function (data) {
            console.log('SIB contact created successfully.');
          },
          function (error) {
            console.error(error);
          }
        );
      }

      const buffer = crypto.randomBytes(32);
      const emailVerificationToken = buffer.toString('hex');

      user.emailVerificationToken = emailVerificationToken;
      await user.save();

      try {
        const baseURL = getBaseURL();
        const data = await ejs.renderFile(
          path.join(__dirname, '../views/emailVerification.ejs'),
          {
            username: user.username,
            email: email,
            link: `${baseURL}/verifyemail/${emailVerificationToken}`,
          }
        );
        await sendEmail(user.email, 'Verify Email Address', data);
      } catch (error) {
        return res
          .status(500)
          .json({ error: 'Unable to send email : ' + error.message });
      }

      res.status(201).json({
        message: "Please check your mail for verification"
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
      })
        .select({
          _id: 1,
          username: 1,
          email: 1,
          password: 1,
          isMember: 1,
          isBlogAuthorized: 1,
          isEmailVerified: 1
        })
        .lean();

      // User not found, return 400
      if (!user) {
        return res.status(400).json({
          error: 'No user found',
        });
      } else if (user.isEmailVerified != null && !user.isEmailVerified) {
        return res.status(400).json({
          error: 'Email not verified',
        });
      }

      const rfcHash = passwordHash(password);

      // Password invalid
      if (rfcHash !== user.password) {
        return res.status(401).json({
          error: 'Invalid login info',
        });
      }

      const jwtUser = buildJWTPayload(user);
      const token = jwt.sign({ user: jwtUser }, config.privateKey, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
      });

      const refreshToken = jwt.sign({ user: jwtUser }, config.refreshPrivateKey, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME
      });

      return res.status(200).json({
        username: user.username,
        token: token,
        refreshToken: refreshToken,
        userID: user._id,
        rememberme: rememberme,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async refreshAuthTokens(req, res) {
    try {
      const { refreshToken, uid } = req.body;

      if (!refreshToken || !uid) {
        return res.status(401).json({ error: "Data missing" });
      }

      const user = await User.findById(uid);

      jwt.verify(refreshToken, config.refreshPrivateKey, async (err, decoded) => {
        if (!err) {
          const jwtUser = buildJWTPayload(user);
          const newToken = jwt.sign({ user: jwtUser }, config.privateKey, {
            expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
          });

          const newRefreshToken = jwt.sign({ user: jwtUser }, config.refreshPrivateKey, {
            expiresIn: REFRESH_TOKEN_EXPIRE_TIME
          });

          res.status(200).json({
            token: newToken,
            refreshToken: newRefreshToken
          })
        } else {
          console.log(e.message);
          return res.status(401).json({ error: err.message });
        }
      });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: e.message });
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

  async verifyemail(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    try {
      const { token } = req.body;
      let user = await User.findOne({
        emailVerificationToken: token,
      });

      if (user) {
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();
        return res.status(200).json({ message: 'Email verified' });
      } else {
        return res.status(400).json({ error: 'Invalid Token' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
