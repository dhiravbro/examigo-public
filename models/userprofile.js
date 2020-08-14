const mongoose = require('mongoose');

var userprofileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	username: {
		type: String
	},
	avatar: {
		default: '1',
		type: String
	},
	email: {
		type: String,
		default: 'abc@xyz.com',
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	city: {
		default: 'City',
		type: String
	},
	state: {
		default: 'State',
		type: String
	},
	course: {
		default: 'Course',
		type: String
	},
	target: {
		default: 'Course',
		type: String
	},
	class: {
		default: '1',
		type: Number
	},
	phonenumber: {
		default: 'Course',
		type: String
	},
	payment: {
		type: Boolean,
		default: 0
	},
	coaching: {
		type: String,
		default: 'No coaching'
	},

	date: {
		type: Date,
		default: Date.now
	}
});

var userprofileModel = mongoose.model('userprofile', userprofileSchema);
module.exports = userprofileModel;
