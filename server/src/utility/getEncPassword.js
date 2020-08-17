/**
 * To get encrypted file execute this file using the command CRYPTOKEY=newSecretKey node getEncPassword
 * Also add the password to be encrypted in the string in the encrypt function
 */

const crypt = require('./crypt.js');
const encPassword = crypt.encrypt('' /** Enter password here to get encrypted password */);
console.log(encPassword);
console.log(crypt.decrypt(encPassword));
