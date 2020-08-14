import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddPost from './AddPost';
import Post from './Post';
import './DiscussionForum.css';
import { allPost } from '../../redux';
 const DiscussionForum = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(allPost());
	}, []);

	const posts = props.postsloading ? (
		<h3>Loading</h3>
	) : (
		<div className="posts-container">
			{props.allPost.map((post, index) => {
				return (
					<Post
						queryimage={post.queryimage}
						post={props.allPost}
						usernameinfo={props.usernameinfo}
						avatarinfo={props.avatarinfo}
						key={index}
						index={index}
						postId={post._id}
						postDetail={post.query}
						comments={post.comment}
						subject={post.subject}
						user={post.username}
						upvote={post.upvote}
						avatar={post.avatar}
						tags={post.tags}
						postdate={post.postdate}
				
					/>
				);
			})}
		</div>
	);

	return (
		<div className="discussion-forum-view">
			<p className="forum-title">DiscussionForum</p>
			<button style = {{position : 'absolute'}} onClick={props.scroll}>Scroll Top</button>
			<AddPost userCourse={props.course} useridinfo={props.useridinfo} usernameinfo={props.usernameinfo} avatarinfo={props.avatarinfo} />
			<div>{posts}</div>
		</div>
	);
};

export default DiscussionForum;
