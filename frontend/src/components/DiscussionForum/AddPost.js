import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux';
import Linkify from 'react-linkify';
import './AddPost.css';
import AddTags from '../Admin/AdminView/UploadExam/AddTags';
const AddPost = (props) => {
	const removeTag = (index) => {
		setPostDetails((prevValue) => {
			return {
				...prevValue,
				tags: [ ...prevValue.tags.slice(0, index), ...prevValue.tags.slice(index + 1) ]
			};
		});
	};
	const addTag = (tag) => {
		setPostDetails((prevValue) => {
			return {
				...prevValue,
				tags: [ ...prevValue.tags, tag ]
			};
		});
	};
	
	
	const removeAllTags = () => {
		setPostDetails((prevValue) => {
			return {
				...prevValue,
				tags: []
			};
		});
		
	};
	const [ postDetails, setPostDetails ] = useState({
		title: '',
		subject: 'Physics',
		queryImage: '',
		tags: []
	});

	const keyDownHandler = (event) => {
		const value = event.target.value;
		if (event.keycode === 13) {
			setPostDetails((prevValue) => {
				return {
					...prevValue,
					title: value + '\n'
				};
			});
		}
	};
	const onChangeHandler = (event) => {
		const name = event.target.name;
		if (name === 'queryImage') {
			const files = event.target.files;
			setPostDetails((prevValue) => {
				return {
					...prevValue,
					[name]: files[0]
				};
			});
		} else {
			const value = event.target.value;
			setPostDetails((prevValue) => {
				return {
					...prevValue,
					[name]: value
				};
			});
		}
	};

	return (
		<div className="add-post-area">
			<Linkify><textarea
				className="add-post-query"
				name="title"
				placeholder="Enter your query"
				value={postDetails.title}
				onChange={onChangeHandler}
				onKeyDown={keyDownHandler}
			/></Linkify>
			<select
				className="add-post-subject"
				name="subject"
				onChange={(e) => {
					onChangeHandler(e);
					removeAllTags();
				}}
				value={postDetails.subject}
			>
				<option value="Physics">PHYSICS</option>
				<option value="Chemistry">CHEMISTRY</option>
				{props.userCourse === 'jee' ? <option value="Mathematics">MATHEMATICS</option> : 
				<option value="Biology">BIOLOGY</option>}
			</select>
			<input name="queryImage" data-type="file" type="file" onChange={onChangeHandler} />
			<AddTags tags={postDetails.tags} addTag={addTag} removeTag={removeTag} subject={postDetails.subject} course={props.userCourse}/>
			<button
				className="add-post-btn"
				variant="primary"
				onClick={() => {
					props.addPost(
						props.useridinfo,
						props.avatarinfo,
						postDetails.title,
						postDetails.queryImage,
						postDetails.subject,
						postDetails.tags,
						props.usernameinfo
					);
					setPostDetails({
						title: '',
						subject: 'Physics',
						queryImage: '',
						tags: []
					});
				}}
			>
				Add post
			</button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: function(userid, avatar, query, queryimage, subject, tags, username) {
			dispatch(addPost(userid, avatar, query, queryimage, subject, tags, username));
		}
	};
};

export default connect(null, mapDispatchToProps)(AddPost);
 