module.exports = getMailOptions = (to, subject, message) => {
	return {
		from: {
			name: "Community Of Coders",
			address: 'communityofcoders@gmail.com'
		},
		to,
		subject,
		html: message,
	};
};
