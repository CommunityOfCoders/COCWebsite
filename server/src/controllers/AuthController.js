const User = require('../models/User')
const passwordhasher = require('password-hasher')

module.exports = {

    async register (req,res) {
        try {
            var {password} = req.body
            
            const hash = passwordhasher.createHash('ssha512',password,new Buffer('83d88386463f0625', 'hex'))

            const rfcHash = passwordhasher.formatRFC2307(hash)

            req.body.password = rfcHash
            
            const user = await User.create(req.body)

            res.send({
                user: user
            })
        } catch (err) {
            res.status(400).send({
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
                return res.status(403).send({
                   error: "Invalid login info" 
                })
            }

            const hash = passwordhasher.createHash('ssha512',password,new Buffer('83d88386463f0625', 'hex'))

            const rfcHash = passwordhasher.formatRFC2307(hash)

            if(rfcHash !== user.password) {
                return res.status(403).send({
                    error: "Invalid login info" 
                })
            }

            res.send({
                user: user
            })
        } catch (err) {
            res.status(400).send({
                err: err
            })
        }
    }

}