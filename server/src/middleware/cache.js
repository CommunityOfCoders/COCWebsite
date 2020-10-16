const redis_client = require("../config/redis");

module.exports = {
  checkEventCache(req, res, next) {
    const { id } = req.params;
    redis_client.get(`event/${id}`, (err, data) => {
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

  checkBlogCache(req, res, next) {
    const { id } = req.params;
    redis_client.get(`blog/${id}`, (err, data) => {
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
};
