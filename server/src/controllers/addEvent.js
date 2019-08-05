const express = require('express');
const path = require('path');
const Event = require('../models/Event')

module.exports = {

	async uploadEvent(req, res) {
		try {
			
			const eventname = req.body.eventName
            const filename = eventname + '-' + req.body.date.substr(0,3) + path.extname(req.file.originalname).toLowerCase()
			
            req.body.imagePath = path.join(__dirname,'../images/events/',filename)

            const event = await Event.create(req.body)
			res.send({
				'message' : "Event has been added"
			})
		} catch (err) {
			res.status(400).send({
				err: err
			})
		}
	}
}