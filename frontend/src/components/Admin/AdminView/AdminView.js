import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import UploadSec from './UploadExam/UploadSec';
import UploadQue from './UploadExam/UploadQue';
import UploadExam from './UploadExam/UploadExam';
import Student from './Student/Student-Enrolled';
import AllExam from './HostExam/AllExam';
import HostedExam from './HostExam/HostedExam';
import RankList from './Student/RankList';
import ClassRoom from './ClassRoom/ClassRoom';
import './AdminView.css';
import  DiscussionForum  from '../../DiscussionForum/DiscussionForum';
import AdminProfile from './AdminProfile/AdminProfile';
import PerfectScrollbar from 'perfect-scrollbar';
 const AdminView = (props) => {
	 let container = document.getElementById('admin-view-area');
	 const ps = new PerfectScrollbar(container);
	 const scroll = () => {
		 ps.scrollTop = 0;
	 }
	return (
		<div style={props.toggle ? { overflowX: 'scroll' } : null} className="admin-view-area" id="admin-view-area">
			
			<Route path="/uploadexam" exact component={UploadExam} />
			<Switch>
				<Route
					exact
					path="/discussion-forum"
					render={() => {
						return (
							<DiscussionForum
							scroll={scroll}
								allPost={props.allPost}
								useridinfo={props.admin.userid}
								avatarinfo={props.profile.avatar}
								usernameinfo={props.admin.username}
							/>
						);
					}}
				/>
				<Route path="/admin-profile" exact component={AdminProfile} />
				<Route path="/secdetails" exact component={UploadSec} />
				<Route path="/student" exact component={Student} />
				<Route path="/hostexam" exact component={AllExam} />
				<Route path="/hostedexam" exact component={HostedExam} />
				<Route path="/classroom" exact component={ClassRoom} />
				<Route path="/addques/:id/:typeofques/:subject" exact component={UploadQue} />
				<Route path="/examperformance/:examid" exact component={RankList} />
			</Switch>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		admin: state.admin.adminDetails,
		profile: state.admin.profile,
		allPost: state.user.allpost,
		postsloading: state.user.postsloading
	};
};
export default connect(mapStateToProps)(AdminView);
