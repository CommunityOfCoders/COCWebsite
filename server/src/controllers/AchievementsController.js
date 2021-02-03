const Achievement = require('../models/Achievement');
const replaceDriveURL = require('../utility/replaceDriveURL');

module.exports = {
  async createAchievement(req,res, next){
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
      next();
    } catch(e){
      return res.status(500).json({ error: e.message });
    }
  },
  async allAchievements(_,res, next){
    try{
      const achievements = await Achievement.find({}).lean();
      res.locals.cache = achievements;
      res.status(200).json({ achievements });
      next();
    } catch(e){
      return res.status(500).json({ error: e.message });
    }
  },

  async getDummyAchievements(_, res) {
    const achievements = [
      {
        title: 'First in SIH Hackathon',
        owner: {
          fullName: 'Smartest guy',
          email: 'guy@gmail.com'
        },
        imageUrl: 'https://dealersupport.co.uk/wp-content/uploads/2020/03/iStock-659111108-587x381.jpg',
        projectUrl: 'https://github.com/CommunityOfCoders/COCWebsite'
      },
      {
        title: 'First in ACM-ICPC',
        owner: {
          fullName: 'Second smartest guy',
          email: 'guy2@gmail.com'
        },
        imageUrl: 'https://image.freepik.com/free-vector/winner_23-2147506357.jpg?2',
        projectUrl: 'https://github.com/CommunityOfCoders/COCWebsite'
      },
      {
        title: 'Google internship',
        owner: {
          fullName: 'Richest guy',
          email: 'richguy@gmail.com'
        },
        imageUrl: 'https://image.freepik.com/free-vector/winner_23-2147506357.jpg?2',
        projectUrl: 'https://github.com/CommunityOfCoders/COCWebsite'
      }
    ]
    return res.status(200).json({ achievements })
  } 
}
