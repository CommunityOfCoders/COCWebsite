const redis = require("redis");
const config = require("./index");

const redis_port = config.redis_port;

const redis_client = redis.createClient(redis_port);

module.exports = redis_client;
