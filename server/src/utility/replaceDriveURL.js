module.exports = {
  replaceDriveURL(googleDriveURL) {
    return googleDriveURL.replace("/open?", "/uc?export=view&");
  },
};
