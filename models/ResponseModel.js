const mongoose = require('mongoose');

var ResponseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},

	examid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'exam'
	},

	examname: {
		type: String
	},

	username: {
		type: String
	},

	response: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'questionid'
			},
			subject: {
				type: String
			},
			secid: {
				type: String
			},
			score: {
				type: Number,
				default: 0
			},
			mark: [],

			marked: {
				type: Boolean
			}
		}
	],

	score: [
		{
			subject: {
				type: Number
			}
		}
	],

	total: {
		type: Number,
		default: 0
	},

	math: {
		type: Number,
		default: 0
	},

	chemistry: {
		type: Number,
		default: 0
	},

	physics: {
		type: Number,
		default: 0
	},

	correcttags: [],

	wrongtags: [],
	unattempttags: [],

	status: {
		type: String,
		Default: 'Not Submitted'
	},

	date: {
		type: Date,
		default: Date.now
	}
});

var ResponseModel = mongoose.model('Response', ResponseSchema);
module.exports = ResponseModel;
