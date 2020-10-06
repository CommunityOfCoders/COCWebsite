require('dotenv').config();
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const cryptoKey = process.env.CRYPTOKEY;

const encrypt = text => {
	const cipher = crypto.createCipher(algorithm, cryptoKey);
	let crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

const decrypt = text => {
	const decipher = crypto.createDecipher(algorithm, cryptoKey);
	let dec = decipher.update(text, 'hex', 'utf-8');
	dec += decipher.final('utf-8');
	return dec;
};

module.exports = {
	encrypt,
	decrypt,
};
