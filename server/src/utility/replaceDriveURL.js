function replaceDriveURL(googleDriveURL) {
  return googleDriveURL.replace("/open?", "/uc?export=view&");
}

module.exports = replaceDriveURL;
