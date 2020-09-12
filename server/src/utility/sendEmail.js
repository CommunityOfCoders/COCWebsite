require('dotenv').config();
const nodemailer = require('nodemailer');
const crypt = require('./crypt');

const encPassword = process.env.ENCPASSWORD;

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'communityofcoders@gmail.com', // Change this email to COC email
		pass: crypt.decrypt(encPassword),
	},
});

module.exports = sendMail = (to, subject, message) => {
	const mailOptions = {
		from: 'communityofcoders@gmail.com', // Change this email to COC email
		to,
		subject,
		html: message,
	};
	transport.sendMail(mailOptions, error => {
		if (error) {
			console.log(error);
		}
	});
};
