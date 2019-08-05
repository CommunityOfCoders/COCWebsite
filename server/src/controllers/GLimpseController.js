const Glimpses = require('../models/GLimpses')
const path = require('path')

module.exports = {
    async save (req,res) {

        try {
            req.body.imagePath = path.join(__dirname,'../images/glimpses/',req.body.eventName)

            console.log(req.body)

            const glimpse = await Glimpses.create(req.body)

            res.send({
                'message' : "The photos have been saved"
            })
        } catch (err) {
            res.status(400).send({
                err: err
            })
        }
    }
}