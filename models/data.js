const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	courseImage: {
		type: String,
	},
	hyperlink: {
		type: String,
		required: true
	},
	date: {
		type: Number
	},
	languages: {
		type: [String]
	},
	keywords: {
		type: [String]
	}
});

module.exports = mongoose.model('Course', dataSchema);