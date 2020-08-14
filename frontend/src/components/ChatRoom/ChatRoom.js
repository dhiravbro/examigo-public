import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatRoom.css';
import Linkify from 'react-linkify';
import moment from 'moment';
import { ReactTinyLink } from 'react-tiny-link'
var linkify = require('linkifyjs');
const ChatRoom = (props) => {
	const [ message, setMessage ] = useState();
	const onChangeHandler = (event) => {
		const value = event.target.value;

		setMessage(value);
	};

	const [ prevMessages, setPrevMessages ] = useState();
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			socket.emit('usermessage', {
				coachingid: props.coachingid,
				course: props.course,
				classs: props.class,
				message,
				username: props.username,
				avatar: props.avatar
			});
			setMessage('');
		}
	};

	const sendMessageHandler = () => {
		socket.emit('usermessage', {
			coachingid: props.coachingid,
			course: props.course,
			classs: props.class,
			message,
			username: props.username,
			avatar: props.avatar
		});
		message.current = '';
	};
	
	const socket = io('http://localhost:5000');
	useEffect(
		() => {
			socket.on('previouschat', (previouschat) => {
				setPrevMessages(
					previouschat.map((chat ,index) => {
						let urlObjArray = linkify.find(chat.usermessage);
						let urlArray = [];
						if (urlObjArray.length > 0){
							for ( let i = 0; i<urlObjArray.length ;i++){
								if(urlObjArray[i].type ==='url'){
									urlArray.push(urlObjArray[i].href);
								}
							}
						}
						return (
							<div
								key={index}
								className="chat-div"
								style={
									chat.username === props.username ? { textAlign: 'right' } : { textAlign: 'left' }
								}
							>
								<div
									className="prev-chat"
									style={
										chat.username === props.username ? (
											{ flexDirection: 'row-reverse' }
										) : (
											{ flexDirection: 'row' }
										)
									}
								>
									<img
										className="avatar"
										src={'http://localhost:5000/static/Avatars/72ppi/avatar' + chat.avatar + '.png'}
										alt="avatar"
										style={
											chat.username === props.username ? (
												{ margin: '0 0 0 10px' }
											) : (
												{ margin: '0 10px 0 0' }
											)
										}
									/>
									<div className="chat-details">
										<p className="chat-user">
											{!(props.username === chat.username) ? chat.username : null}
										</p>
										<div
											className="message-info"
											style={
												chat.username === props.username ? (
													{ backgroundColor: '#1877f2', color: '#fff' }
												) : (
													{ backgroundColor: '#e4e6eb' }
												)
											}
										>
											<Linkify properties = {{target : '_blank'}}><span className="chat-message">{chat.usermessage}</span></Linkify>
											{urlArray.length > 0 ? 
											<ReactTinyLink 
												cardSize="small"
												showGraphic={true}
												maxLine={2}
												minLine={1}
												url={urlArray[0]}
													/> : null}
											
											<p className="message-date">{moment(chat.messagedate).format('h:mm a')}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})
				);
			});
			socket.emit('connectroom', { coachingid: props.coachingid, course: props.course, classs: props.class });
		},
		[ props ]
	);
	return (
		<div className="chatroom-view">
			{/* <h1 className="chatroom-title">ChatRoom</h1> */}
			<div className="chatroom-div">{prevMessages}</div>
			<div className="message-box">
				<input
					type="text"
					value={message}
					onKeyDown={handleKeyDown}
					onChange={onChangeHandler}
					autocomplete={false}
					placeholder="Send your message ..."
					className="message-input"
				/>
				<button className="send-message-btn" onClick={sendMessageHandler}>
					Send message
				</button>
			</div>
		</div>
	);
};

export default ChatRoom;
