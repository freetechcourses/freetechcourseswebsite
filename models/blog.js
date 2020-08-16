const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	blogImage: {
		type: String,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	pin: {
		type: Boolean,
		default: false
	}
});
module.exports = mongoose.model('Blog', blogSchema);