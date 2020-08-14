var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./route/userroute');
const connectDB = require('./config/connectdb');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
connectDB();
let chatModel = require('./models/chatModel.js');
let postModel = require('./models/Discussion.js');
app.use('/', router);

io.on('connection', function(socket) {
	// socket.emit('message','Welcome to examigo!');
  
	socket.on('connectroom', function(data) {
		console.log(data);
		chatModel.find({ _id: data.coachingid }).limit(100).then((chatrooms) => {
			chatrooms[0].rooms.forEach((rooms) => {
				if (rooms.course == data.course && rooms.class == data.classs) {
					socket.join(rooms.roomName);
					io.to(rooms.roomName).emit('previouschat', rooms.roomchat);
				}
			});
		});
	});
	socket.on('discussionforum', function(data) {
		console.log(data);
		postModel.find().sort({ postdate: -1 }).then((allPost) => {
			socket.join('Discussion');
			io.to('Discussion').emit('allpost', allPost);
		});
	});
	socket.on('addPost', async (data) => {
		try {
			console.log(data);
			if (data.message == '') {
				console.log('empty message');
			} else {
				const message = await postModel.find({ _id: data.coachingid });
				// console.log(chatrooms);

				message[0].rooms.forEach((rooms) => {
					if (rooms.course == data.course && rooms.class == data.classs) {
						rooms.roomchat.push({
							username: data.username,
							usermessage: data.message,
							avatar: data.avatar
						});
						message[0].save();
						io.to('Discussion').emit('allpost');
					}
				});
			}
		} catch (err) {
			console.error(err);
		}
	}); 
	socket.on('usermessage', async (data) => {
		try {
			if (data.message == '') {
				console.log('empty message');
			} else {
				const message = await chatModel.find({ _id: data.coachingid });
				// console.log(chatrooms);

				message[0].rooms.forEach((rooms) => {
					if (rooms.course == data.course && rooms.class == data.classs) {
						rooms.roomchat.push({
							username: data.username,
							usermessage: data.message,
							avatar: data.avatar
						});
						message[0].save();
						io.to(rooms.roomName).emit('previouschat', rooms.roomchat);
					}
				});
			}
		} catch (err) {
			console.error(err);
		}
	});
});

server.listen(5000, function() {
	console.log('server started on port 5000');
});
