const jwt = require("jsonwebtoken");
const { body, oneOf } = require('express-validator');
const config = require("../config");

module.exports = {
  loginRequired(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, config.privateKey, (err, decoded) => {
        if (!err) {
          const d = new Date();
          if (decoded && Number(decoded.exp) * 1000 > d.getTime()) {
            req['userID'] = decoded.user._id
            req['user'] = decoded.user
            next();
          } else {
            return res.status(401).json({ error: "Token has expired" });
          }
        } else {
          console.log(err.message);
          return res.status(401).json({ error: err.message });
        }
      });
    } catch (e) {
      console.log(e.message);
      return res.status(401).json({ error: e.message });
    }
  },
  validate(method) {
    switch (method) {
      case 'register': {
        return [
          body('username', 'username is required').exists(),
          body('password', 'password is required').exists().custom((value, { req }) => {
            if (value.length < 8) {
              throw new Error('Password should be at least 8 characters long');
            }
            return true;
          }),
          body('email', 'email is required').exists().isEmail().normalizeEmail(),
          body('graduationYear', 'graduationYear is required').exists().custom((value, { req }) => {
            if (Number(value) < 2018) {
              throw new Error('Invalid Graduation Year');
            }
            return true;
          }),
          body('description').optional().trim().escape()
        ]
      }
      case 'login': {
        return [
          body('username', 'username is required').exists(),
          body('password', 'password is required').exists().custom((value, { req }) => {
            if (value.length < 8) {
              throw new Error('Password should be at least 8 characters long');
            }
            return true;
          }),
          body('rememberme', 'rememberme is required').exists()
        ]
      }
      case 'verifyToken': {
        return [
          body('token', 'token is required').exists()
        ]
      }
      case 'getUser': {
        return oneOf([
          body('username', 'username is required').exists(),
          body('userID', 'userID is required').exists(),
        ])
      }
      case 'forgetPassword': {
        return [
          body('email', 'email is required').exists().isEmail().normalizeEmail()
        ]
      }
      case 'newPassword': {
        return [
          body('newPassword', 'newPassword is required').exists().custom((value, { req }) => {
            if (value.length < 8) {
              throw new Error('New password should be at least 8 characters long');
            }
            return true;
          }),
          body('token', 'token is required').exists()
        ]
      }
    }
  }
}
