const config = {
  port: process.env.PORT || 8000,
  redis_port: process.env.PORT || 6379,
  privateKey: "COC is great",
  oAuthClientID:
    "867161018507-an34btl13d6n23ujgcjnjpm4qvdacqss.apps.googleusercontent.com",
  oAuthclientSecret: "visPWNEfpoigIUS4MxzGxXPC",
  searchPageSize: 100,
  albumPageSize: 50,
  apiEndpoint: "https://photoslibrary.googleapis.com",
  env: "development"
};

module.exports = config;
