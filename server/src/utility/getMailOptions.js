module.exports = getMailOptions = (to, subject, message) => {
	return {
		from: {
			name: "Community Of Coders",
			address: 'coc@vjti.ac.in'
		},
		to,
		subject,
		html: message,
	};
};
