require('dotenv').config();
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const getMailOptions = require('./getMailOptions');

const sendinbluePass = process.env.SENDINBLUE_PASS;

const transport = nodemailer.createTransport({
	host: 'smtp-relay.sendinblue.com',
	port: 587,
	secure: false,
	auth: {
		user: 'communityofcoders@gmail.com',
		pass: sendinbluePass,
	},
});

module.exports = sendMail = async (to, subject, message) => {
	const mailOptions = getMailOptions(to, subject, message);
	transport.sendMail(mailOptions, error => {
		if (error) {
			console.log(error);
		}
	});
};
