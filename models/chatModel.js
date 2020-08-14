const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'coachingid'
    },
    
    rooms:[{
		roomName:{
			type:String,
			default: 'Room1',
		},
        class:{
			default: 'Class',
            type:String
		},
		course: {
			default: 'Course',
			type: String
		},
		roomchat:[
			{	avatar:{
				type: String
			},
				username: {
					type: String
				},
				messagedate: {
					type: Date,
					default: Date.now
				},
				usermessage:{
					type:String,
				}
			}
		]
    }],

	
});

var chatModel = mongoose.model('chatroom', chatSchema);
module.exports = chatModel;
