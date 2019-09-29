const express = require('express');
const path = require('path');
const Event = require('../models/Event')

module.exports = {
	async getEvents(_req, res) {
		const events = await Event.find()

		res.json(events)
	},
	async getEventById(req, res) {
		const eventId = req.params.id;
		const event = await Event.findById(eventId);
		res.json(event)
	},
	async uploadEvent(req, res) {
		try {
			
			const eventname = req.body.eventName
            const filename = eventname + '-' + req.body.date.substr(0,3) + path.extname(req.file.originalname).toLowerCase()
			
            req.body.imagePath = path.join(__dirname,'../images/events/',filename)

			const event = await Event.create(req.body)
			res.json({"id": event._id});
		} catch (err) {
			res.status(400).send({
				err: err
			})
		}
	},
	async updateEvent(req, res) {
		const eventId = req.params.id;
		const event = Event.findById(eventId);
		res.json({"id": event._id});
	},
	async deleteEvent(_req, res) {
		const eventId = req.params.id;
		const event = Event.findById(eventId);
		await event.remove();
		res.status(204);
	},
}