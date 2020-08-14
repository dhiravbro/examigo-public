const mongoose = require('mongoose');

var ExamSchema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admin'
	},
	examname: {
		type: String
	},
	course: {
		type: String
	},
	class: {
		type: String
	},
	description: {
		type: String
	},
	host: {
		type: String,
		Default: '0'
	},
	examdate: {
		type: Date
	},
	examtime: {
		type: String
	},
	duration: {
		type: Number
	},
	sec: [
		{
			subject: {
				type: String
			},
			secname: {
				type: String
			},
			typeofques: {
				type: String
			},
			positive: {
				type: Number
			},
			negative: {
				type: Number
			},
			question: [
				{
					tag: [],

					question: {
						type: String
					},
					option1: {
						type: String
					},
					option2: {
						type: String
					},
					option3: {
						type: String
					},
					option4: {
						type: String
					},
					correct: []
				}
			]
		}
	],
	attemptedstudent: [],
	date: {
		type: Date,
		default: Date.now
	}
});

var ExamModel = mongoose.model('Exam', ExamSchema);
module.exports = ExamModel;
