const User = require("../models/User")

module.exports = {
    async isMember(req,res,next){
        try{
            if(req.user.isMember)
                return next();
            else
                return res.status(403).json({error:"You are not authorized"})
        }catch(e){
            return res.status(403).json({error:e.message})
        }
    }
}