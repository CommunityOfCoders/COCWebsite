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
            const {password,username} = req.body
            
            const user1 = await User.findOne({
                username: username
            })

            if(user1) {
                return res.status(203).send({
                   error: "UserName Already Exists" 
                })
            }

            console.log("Yes")

            req.body.password = passwordHash(password);
            
            const user = await User.create(req.body)

            const token = jwt.sign(
                {user: user},
                config.privateKey,
                {expiresIn: 3600}
            )

            res.send({
                username: user.username,
                token: token
            })
        } catch (err) {
            res.status(201).send({
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
                return res.status(203).send({
                   error: "Invalid login info" 
                })
            }

            const rfcHash = passwordHash(password);

            if(rfcHash !== user.password) {
                return res.status(203).send({
                    error: "Invalid login info" 
                })
            }

            const token = jwt.sign(
                {user: user},
                config.privateKey,
                {expiresIn: 60*60}
            )

            res.send({
                username: user.username,
                token: token
            })
        } catch (err) {
            res.status(201).send({
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
    },

    async getUser(req,res) {
        try {
            
            const {username} = req.body

            const user = await User.findOne({
                username: username
            })

            user.password = null

            res.status(200).json(user)
        } catch (e) {
            res.status(201).send({
                message: 'An error has occured',
                err: e
            })
        }
    }

}