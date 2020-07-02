const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	passhash: {
		type: String, 
		required: true
	},
	resetToken: {
		type: String
	}
});
module.exports = mongoose.model('User', userSchema);