const redis_client = require("../config/redis");

module.exports = {
  checkCache(req, res, next) {
    const type = req.path.split("/")[2]; // returns blogs, events, etc.
    redis_client.get(type, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          err,
        });
      }

      if (data != null) {
        const return_data = JSON.parse(data);
        res.status(200).json(return_data);
      } else {
        next();
      }
    });
  },

  deleteCache(req, res, next) {
    const type = req.path.split("/")[2]; // returns blogs, events, etc.
    redis_client.get(type, (err, reply) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        redis_client.del(type);
        next();
      }
    });
  },
};
