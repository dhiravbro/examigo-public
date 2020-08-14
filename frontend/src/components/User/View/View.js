import React from 'react';
import { connect } from 'react-redux';
import UserProfile from './UserProfile/UserProfile';
import { Feedback } from './Feedback/Feedback';
import { Route, Switch} from 'react-router-dom';
import AllTest from './Test/AllTest';
import DashBoard from './Dashboard/DashBoard';
import  DiscussionForum  from '../../DiscussionForum/DiscussionForum';
import ChatRoom from '../../ChatRoom/ChatRoom';
import ExamResult from './AttemptedExam/ExamView/ExamResult';
import ExamAnalysis from './AttemptedExam/ExamAnalysis/ExamAnalysis';
import StudentNavbar from '../Layout/Navbar/StudentNavbar';
import './View.css';
const View = (props) => {
	return (
		<div className="view-area">
			{/* <DashBoard /> */}
			<StudentNavbar />
			<Switch>
				
				<Route exact path="/dashboard" component={DashBoard} />
				<Route exact path="/userprofile" component={UserProfile} />
				<Route exact path="/feedback" component={Feedback} />
				<Route exact path="/upcoming" component={AllTest} />
				<Route exact path="/exam-analysis/:examid" component={ExamAnalysis} />
				<Route exact path="/exam-results" component={ExamResult} />
				<Route
					exact
					path="/chat-room"
					render={() => {
						return (
							<ChatRoom
								coachingid={props.profile.coaching}
								course={props.profile.course}
								class={props.profile.class}
								avatar={props.profile.avatar}
								username={props.profile.username}
						
							/>
						);
					}}
				/>
				<Route
					exact
					path="/discussion-forum"
					render={() => {
						
							return (
								<DiscussionForum
									allPost={props.allPost}
									useridinfo={props.user.userid}
									avatarinfo={props.profile.avatar}
									usernameinfo={props.user.username}
									course={props.profile.course}
								/>
							);
						
					}}
				/>
		
			</Switch>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.user.userDetails,
		profile: state.user.profile,
		allPost: state.user.allpost,
		postsloading: state.user.postsloading
	};
};
export default connect(mapStateToProps)(View);
