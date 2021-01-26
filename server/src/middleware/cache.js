const redis_client = require("../config/redis");

module.exports = {
  getFromCache(req, res, next) {
    const type = req.path.split("/")[2]; // returns blogs, events, etc.
    redis_client.get(type, (err, data) => {
      if (err) {
        next();
      }

      if (data != null) {
        const return_data = JSON.parse(data);
        res.status(200).json(return_data);
      } else {
        next();
      }
    });
  },

  deleteCache(req, res) {
    const type = req.path.split("/")[2]; // returns blogs, events, etc.
    redis_client.del(type);
  },

  setCache(req, res) {
    const type = req.path.split("/")[2];
    redis_client.set(type, JSON.stringify(res.cache))
  }
};
