const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	subject: {
		type: String
	},
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userid'
	},
	username: {
		type: String
	},
	avatar: {
		type: String
	},
	query: {
		type: String
	},
	tags: [],
	queryimage: {
		type: String
	},
	comment: [
		{
			id: {
				type: Date
			},
			avatar: {
				type: String
			},
			username: {
				type: String
			},
			userComment: {
				type: String
			},
			commentdate: {
				type: Date,
				default: Date.now
			}
		}
	],

	upvote: [],

	postdate: {
		type: Date,
		default: Date.now
	}
});

var postModel = mongoose.model('posts', postSchema);
module.exports = postModel;
