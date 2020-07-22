const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
    async loginRequired(req,res,next) {
        try{
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.privateKey, (err, decoded) => {
                if(!error){
                    const d = new Date();
                    if (decoded && Number(decoded.exp)*1000>d.getTime()) {
                        next();
                    } else {
                        return res.status(401).json({error:"Token has expired"});
                    }
                }else{
                    return res.status(401).json({error:err.message});
                } 
            });
        }catch(e){
            return res.status(401).json({error:e.message});
        }
    }
}