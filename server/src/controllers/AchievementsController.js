const Achievement = require('../models/Achievement');
const replaceDriveURL = require('../utility/replaceDriveURL');

module.exports = {
  async createAchievement(req,res){
    try{
      const body = req.body;
      let projectUrl = "";
      if (!!body['Project URL (Optional)'] && body['Project URL (Optional)'].length > 0) {
        projectUrl = body['Project URL (Optional)'][0];
      }
      const achievement = {
        title: body['Achievement Title'][0],
        owner: {
          fullName: body['Full Name'][0],
          email: body['Email Address'][0]
        },
        imageUrl: replaceDriveURL(body['Achievement Image'][0])
      }
      if (!!projectUrl) {
        achievement["projectUrl"] = projectUrl;
      }
      await Achievement.create(achievement);
      res.status(200).json({ Status: "OK" });
    } catch(e){
      return res.status(500).json({ error: e.message });
    }
  },
  async allAchievements(_,res){
    try{
      const achievements = await Achievement.find({});
      return res.status(200).json({ achievements });
    } catch(e){
      return res.status(500).json({ error: e.message });
    }
  }
}
