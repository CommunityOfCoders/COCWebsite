require('dotenv').config();
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const getMailOptions = require('./getMailOptions');

const encPassword = process.env.ENCPASSWORD;

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'coc@vjti.ac.in',
		pass: crypt.decrypt(encPassword),
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
