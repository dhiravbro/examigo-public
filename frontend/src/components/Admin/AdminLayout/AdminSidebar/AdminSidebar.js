import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';
import { hostedexam, logoutAdmin, allPost } from '../../../../redux';

const AdminSidebar = (props) => {
	const activeStyle = {
		color: '#3333ff',
		backgroundColor: 'white',
		borderTopLeftRadius: '15px',
		borderBottomLeftRadius: '15px'
	};
	console.log(props);
	const style = { color: 'white', fontSize: '1.1rem' };
	return (
		<Fragment>
			<div style={props.toggle ? null : { display: 'none' }} className="Sidebar">
				<span className="sidebar-brand">examigo</span>
				<div className="user-sidebar-info">
					<img
						className="sidebar-avatar"
						src={'http://localhost:5000/static/Avatars/72ppi/avatar' + props.profile.avatar + '.png'}
						alt="avatar"
					/>
					<div className="user-greeting">
						<span className="user">Hi {props.admin.username} !</span>
						<span className="greeting">What's Your Goal for Today?</span>
					</div>
				</div>
				<NavLink to="/admin-profile">Profile</NavLink>
				<div className="sidebar-options-list">
					<NavLink
						className="sidebar-options"
						activeStyle={activeStyle}
						to="/discussion-forum"
						onClick={() => props.allPost()}
					>
						Discussion Forum
					</NavLink>

					<NavLink className="sidebar-options" activeStyle={activeStyle} to="/student">
						Students
					</NavLink>

					<NavLink className="sidebar-options" activeStyle={activeStyle} to="/uploadexam">
						Upload Paper
					</NavLink>
					<NavLink className="sidebar-options" activeStyle={activeStyle} to="/classroom">
						Classroom
					</NavLink>

					<NavLink className="sidebar-options" activeStyle={activeStyle} to="/hostexam">
						Host exam
					</NavLink>

					<NavLink
						className="sidebar-options"
						activeStyle={activeStyle}
						onClick={() => props.hostedexam(props.admin.userid)}
						style={style}
						to="/hostedexam"
					>
						Hosted exam
					</NavLink>

					<NavLink className="sidebar-options" activeStyle={activeStyle} to="/feedback">
						Feedback
					</NavLink>

					<NavLink
						className="sidebar-options"
						activeStyle={activeStyle}
						to="*"
						onClick={() => props.logoutAdmin()}
					>
						Logout
					</NavLink>
				</div>
				<span className="copyright">© CopyRight of Examigo {new Date().getFullYear()}</span>
			</div>
			<div className="toggler" style={!props.toggle ? { left: '0' } : null} onClick={props.toggler}>
				<i class="fas  fa-chevron-right chevron" />
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	admin: state.admin.adminDetails,
	profile: state.admin.profile
});

const mapDispatchToProps = (dispatch) => {
	return {
		hostedexam: (id) => {
			dispatch(hostedexam(id));
		},

		logoutAdmin: function() {
			dispatch(logoutAdmin());
		},
		allPost: function() {
			dispatch(allPost());
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);
