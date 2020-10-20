const redis_client = require("../config/redis");

module.exports = {
  checkCache(req, res, next) {
    const { id } = req.params;
    const type = req.path.split("/")[2]; // returns blogs, events, etc.
    redis_client.get(`${type}/${id}`, (err, data) => {
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
