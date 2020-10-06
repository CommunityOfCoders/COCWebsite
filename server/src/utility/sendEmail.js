require('dotenv').config();
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const getMailOptions = require('./getMailOptions');

const encPassword = process.env.ENCPASSWORD;

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'communityofcoders@gmail.com',
		pass: crypt.decrypt(encPassword),
	},
});

module.exports = sendMail = (to, subject, message) => {
	const mailOptions = getMailOptions(to, subject, message);
	transport.sendMail(mailOptions, error => {
		if (error) {
			console.log(error);
		}
	});
};
