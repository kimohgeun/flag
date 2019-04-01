const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
	uploader: {
		type: String,
		required: true,
	},
	files: [
		{
			filename: {
				type: String,
				required: true,
			},
			path: {
				type: String,
				required: true,
			},
			flag: {
				type: String,
				required: true,
			},
			upload_date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = File = mongoose.model('file', FileSchema);
