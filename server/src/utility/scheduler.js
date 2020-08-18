const schedule = require('node-schedule');
const sendEmail = require('./sendEmail');

const scheduleEmailNotification = (date, data) => {
	const { jobName, to, subject, message } = data;
	schedule.scheduleJob(jobName, date, () => {
		sendEmail(to, subject, message);
	});
};

const removeNotification = data => {
	const { substring } = data;
	for (const prop in schedule.scheduledJobs) {
		if (prop.includes(substring)) {
			schedule.scheduledJobs[prop].cancel();
		}
	}
};

const rescheduleNotification = (date, data) => {
	const { prefix } = data;
	for (const prop in schedule.scheduledJobs) {
		if (prop.toString().startsWith(prefix)) {
			schedule.scheduledJobs[prop].reschedule(date);
		}
	}
};

const getNumberOfJobs = () => {
	return Object.keys(schedule.scheduledJobs).length;
};

module.exports = {
	scheduleEmailNotification,
	removeNotification,
	rescheduleNotification,
	getNumberOfJobs,
};
