const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    async isBlogAuthorized(req, res, next){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token,config.privateKey);
            if(decodedToken.user.isBlogAuthorized)
                return next();
            else
                return res.status(403).json({error:"Blog not authorized"});
        }catch(e){
            return res.status(500).json({error:e.message});
        }
        // req.flash('error_msgs', 'Please log in to access this page');
    }
};
