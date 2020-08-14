import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddTags from '../../../Admin/AdminView/UploadExam/AddTags';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../../redux';
import './StudentNavbar.css';
const StudentNavbar = (props) => {
	const [ tags, setTags ] = useState([]);
	const removeTag = (index) => {
		let tagArray = [ ...tags.slice(0, index), ...tags.slice(index + 1) ];
		setTags(tagArray);
	};
	const addTag = (tag) => {
		setTags([ ...tags, tag ]);
	};
	const [ dropdown, setDropdown ] = useState(false);
	const toggleDropdown = () => {
		setDropdown(!dropdown);
	};
	return (
		<div className="student-navbar">
			<AddTags tags={tags} removeTag={removeTag} addTag={addTag} classNames={{ root: 'form-input' }} />
			<span onClick={toggleDropdown}>
				<i className="fas fa-cog" />
				<i className="fas fa-caret-down" />
			</span>
			<div className="navbar-dropdown" style={dropdown ? null : { display: 'none' }}>
			<div className="navbar-dropdown-option" >
			<NavLink to="/userprofile">Profile</NavLink>
			</div>
			<div className="navbar-dropdown-option" >
			<NavLink to="/logout" onClick={() => props.logoutUser()}>
					Logout
				</NavLink>
			</div>
				
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: function() {
			dispatch(logoutUser());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentNavbar);
