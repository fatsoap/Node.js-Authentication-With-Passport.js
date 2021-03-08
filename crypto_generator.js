var crypto = require('crypto');
var code = crypto.randomBytes(64).toString('hex');
console.log(code);