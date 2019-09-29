const User = require('../models/User')
const passwordhasher = require('password-hasher')
const jwt = require('jsonwebtoken')
const config = require('../config')

function passwordHash(password) {
        const hash = passwordhasher.createHash('ssha512',password,new Buffer('83d88386463f0625', 'hex'))
        const rfcHash = passwordhasher.formatRFC2307(hash)
        return rfcHash;
}
module.exports = {

    async register (req,res) {
        try {
            var {password} = req.body
            

            req.body.password = passwordHash(password);
            
            const user = await User.create(req.body)

            const token = jwt.sign(
                {user: user},
                config.privateKey,
                {expiresIn: 60}
            )

            res.send({
                user: user,
                token: token
            })
        } catch (err) {
            res.status(500).send({
                err: err
            })
        }
    },
    async login (req,res) {
        try {
            const {username,password} = req.body

            const user = await User.findOne({
                username: username
            })

            if(!user) {
                return res.status(303).send({
                   error: "Invalid login info" 
                })
            }

            const rfcHash = passwordHash(password);

            if(rfcHash !== user.password) {
                return res.status(303).send({
                    error: "Invalid login info" 
                })
            }

            const token = jwt.sign(
                {user: user},
                config.privateKey,
                {expiresIn: 60*3}
            )

            res.send({
                user: user,
                token: token
            })
        } catch (err) {
            res.status(500).send({
                err: err
            })
        }
    },

    async verifyToken(req,res) {
        const {token} = req.body

        try {
            jwt.verify(token,config.privateKey)
            return res.send({
                status: true
            })
        } catch (err) {
            return res.send({
                status:false
            })
        }
    }

}