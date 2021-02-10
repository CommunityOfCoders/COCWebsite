const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
    loginRequired(req,res,next) {
        try{
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.privateKey, (err, decoded) => {
                if(!err){
                    const d = new Date();
                    if (decoded && Number(decoded.exp)*1000>d.getTime()) {
                        req['userID'] = decoded.user._id 
                        req['user'] = decoded.user
                        next();
                    } else {
                        return res.status(401).json({error:"Token has expired"});
                    }
                }else{
                    console.log(err.message);
                    return res.status(401).json({error:err.message});
                } 
            });
        }catch(e){
            console.log(e.message);
            return res.status(401).json({error:e.message});
        }
    }
}