const Event = require('../models/Event');
const User = require('../models/User');
const scheduler = require('./scheduler');
const path = require('path');
const ejs = require('ejs');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getNotificationDate = eventDate => {
	return new Date(
		parseInt(eventDate[3]),
		months.indexOf(eventDate[1]),
		parseInt(eventDate[2]),
		3
	); // Sends notification at 08:30 IST at the day of the event
};

module.exports = {
	async reschedule() {
    console.log("Scheduling Events");
		const events = await Event.find();
		events.forEach(async event => {
			if (event.registeredUsers && event.registeredUsers.length !== 0) {
				event.registeredUsers.forEach(async uid => {
					const user = await User.findById(uid);
					const eventDate = event.date.split('-');
					const notificationDate = getNotificationDate(
						eventDate[0].split(' ')
					);
					const userEmail = user.email;
					const mailData = await ejs.renderFile(path.resolve(__dirname, '../views','eventReminder.ejs'),
						{ event, user });
          const data = {
            jobName: `${event._id}-${userEmail}`,
            to: userEmail,
            subject: `${event.eventName} Reminder!!`,
            message: mailData,
          };
          scheduler.scheduleEmailNotification(notificationDate, data);
				});
			}
		});
	},
};
