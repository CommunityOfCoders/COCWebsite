const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
    async loginRequired(req,res,next) {
        try{
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.privateKey, (err, decoded) => {
                const d = new Date();
                if (decoded && Number(decoded.exp)*1000>d.getTime()) {
                    next();
                } else {
                    return res.status(400).json({error:"Please Log In First"});
                }
            });
        }catch(e){
            return res.status(400).json({error:e.message});
        }
    }
}