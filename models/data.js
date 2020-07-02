const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
	hyperlink: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	technologies: {
		type: [String]
	},
	categories: {
		type: [String]
	}
});

module.exports = mongoose.model('Data', dataSchema);