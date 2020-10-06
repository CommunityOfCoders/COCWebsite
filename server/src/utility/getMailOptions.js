module.exports = getMailOptions = (to, subject, message) => {
	return {
		from: 'communityofcoders@gmail.com',
		to,
		subject,
		html: message,
	};
};
