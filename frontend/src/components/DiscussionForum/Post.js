import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Post.css';
import { addComment, deletePost, deleteComment } from '../../redux';
import Linkify from 'react-linkify';
import moment from 'moment';
import { ReactTinyLink } from 'react-tiny-link'
var linkify = require('linkifyjs');
const Post = (props) => {
	const [ showComments, setShowComments ] = useState(false);
	const [ comment, setComment ] = useState('');
	const onChangeHandler = (event) => {
		const value = event.target.value;
		setComment(value);
	};

	const showCommentSection = () => {
		setShowComments(!showComments);
	};
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			props.addComment(props.postId, props.avatarinfo, props.usernameinfo, comment, 0);
			setComment('');
			setShowComments(true);

		}
	};

	
	let urlObjArray = linkify.find(props.postDetail);
	let urlArray = [];
	if (urlObjArray.length > 0){
		for ( let i = 0; i<urlObjArray.length ;i++){
			if(urlObjArray[i].type ==='url'){
				urlArray.push(urlObjArray[i].href);
			}
		}
	}
	
	return (
		<div className="post">
			<div className="post-content">
				<div className="post-details">
					<img
						className="post-avatar"
						src={'http://localhost:5000/static/Avatars/72ppi/avatar' + props.avatar + '.png'}
						alt="avatar"
					/>
					<div className="post-user-details">
						<span className="post-user">{props.user}</span>
						<span className="post-timing">{moment(props.postdate).fromNow()}</span>
					</div>

					{props.user === props.usernameinfo ? (
						<button
							onClick={() => {
								props.deletePost(props.postId);
							}}
						>
							<i class="fas fa-trash" />
						</button>
					) : null}
				</div>
				<p className="post-subject">
					<span>Query Regarding :</span>
					{props.subject}
				</p>
				{props.tags.length>0 ? <div className="post-tag-div">
				<p>Added Tags : </p>
					{props.tags.map((tag ,index) => {
						return <span key={index} className="post-tag">{tag.name}</span>;
					})}
				</div>:null}
				
				<div className="post-query">
					<Linkify properties = {{target : '_blank'}}>{props.postDetail}</Linkify>
					{urlArray.length > 0 ? <ReactTinyLink 
						cardSize="small"
						showGraphic={true}
						maxLine={2}
						minLine={1}
						url={urlArray[0]}
							/> : null}
					{props.queryimage === 'NoImage' ? null : (
						<img
							className="query-image"
							src={'http://localhost:5000/static/uploads/' + props.queryimage}
							alt="product"
						/>
					)}
				</div>
			</div>
			<div className="post-button-div">
				<button
					style = {props.upvote.includes(props.usernameinfo) ? {backgroundColor : 'black'} : null}
					className="post-button"
					onClick={() => {
						props.addComment(props.postId, props.avatarinfo, props.usernameinfo, '', !props.upvote);
					}}
				>
				<i className="far fa-thumbs-up"></i> Upvotes : {props.upvote.length}
				</button>
				<button className="post-button" onClick={showCommentSection}>
					<i className="far fa-comment-alt fa-sm" /> Comments : {props.comments.length}
				</button>
				<button className="post-button"><i className="far fa-flag"></i> Report</button>
			</div>


			<div className="comment-section">
				<input
					className="comment-input"
					type="text"
					name="comment"
					onChange={onChangeHandler}
					onKeyDown={handleKeyDown}
					value={comment}
					placeholder="Enter a comment ...."
				/>

				{props.post[props.index].comment.map((comment,index) => (
					<div className="comment-div" key={index} style={showComments ? null : { display: 'none' }}>
						<img
							className="comment-avatar"
							src={'http: //localhost:5000/static/Avatars/72ppi/avatar' + comment.avatar + '.png'}
							alt="avatar"
							
						/>
						<div className="comment-details">
							<div className="comment-info">
								<span className="comment-username">{comment.username}</span>
								<span className="comment-date">{moment(comment.commentdate).fromNow()}</span>
							</div>
							{comment.username === props.usernameinfo ? (
								<button
									className="post-button"
									onClick={() => {
										props.deleteComment(props.postId, comment._id);
									}}
								>
									<i class="fas fa-trash" />
								</button>
							) : null}
							<p className="comment">{comment.userComment}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addComment: function(postid, avatar, username, comment, upvote) {
			dispatch(addComment(postid, avatar, username, comment, upvote));
		},
		deletePost: function(postid) {
			dispatch(deletePost(postid));
		},
		deleteComment: function(postid, commentid) {
			dispatch(deleteComment(postid, commentid));
		}
	};
};

export default connect(null, mapDispatchToProps)(Post);
