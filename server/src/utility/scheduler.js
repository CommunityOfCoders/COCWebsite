const schedule = require('node-schedule');
const sendEmail = require('./sendEmail');

const scheduleEmailNotification = (date, data) => {
	const { jobName, to, subject, message } = data;
	schedule.scheduleJob(jobName, date, () => {
		sendEmail(to, subject, message);
  });
  console.log('[scheduler.js] 9',schedule.scheduledJobs);
};

const removeNotification = data => {
  const { substring } = data;
  console.log('[scheduler.js] 14',schedule.scheduledJobs);
	for (const prop in schedule.scheduledJobs) {
		if (prop.toString().includes(substring)) {
			schedule.scheduledJobs[prop].cancel();
		}
  }
  console.log('[scheduler.js] 20',schedule.scheduledJobs);
};

const rescheduleNotification = (date, data) => {
	const { prefix } = data;
	for (const prop in schedule.scheduledJobs) {
		if (prop.toString().startsWith(prefix)) {
			schedule.scheduledJobs[prop].reschedule(date);
		}
	}
};

module.exports = {
	scheduleEmailNotification,
	removeNotification,
	rescheduleNotification,
};
