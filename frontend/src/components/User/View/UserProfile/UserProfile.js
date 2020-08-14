import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showUser, updateUser, changePassword } from '../../../../redux/index';
import './UserProfile.css';

const UserProfile = (props) => {
	const [ avatar, setAvatar ] = useState(props.profile.avatar);

	const avatarChangeHandler = (event) => {
		const value = event.target.value;
		setAvatar(value);
	};
	const [ userDetails, UserDetails ] = useState({
		phonenumber: null,
		course: null,
		class: null,
		city: null,
		state: null,
		email: null,
		newpassword: '',
		oldpassword: ''
	});

	const changeHandler = (event) => {
		const { name, value } = event.target;
		UserDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value
			};
		});
	};

	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(showUser(props.user.userid));
		},
		[ props.user.userid ]
	);

	return (
		<div className="userprofile-div">
			<h1>Your Profile</h1>
			<img
				className="profile-avatar"
				src={'http://localhost:5000/static/Avatars/72ppi/avatar' + props.profile.avatar + '.png'}
				alt="avatar"
			/>
			<div className="input-box">
				<label htmlFor="exampleEmail">Username :</label>
				<input
					className="form-input"
					type="text"
					name="username"
					id="userName"
					onChange={changeHandler}
					value={props.user.username}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="Email">Email :</label>
				<input
					className="form-input"
					type="email"
					name="email"
					id="Email"
					onChange={changeHandler}
					placeholder={props.profile.email}
					value={userDetails.email}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleEmail">Phone Number :</label>
				<input
					className="form-input"
					type="text"
					name="phonenumber"
					onChange={changeHandler}
					placeholder={props.profile.phonenumber}
					value={userDetails.phonenumber}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleAddress">Course :</label>
				<input
					className="form-input"
					type="text"
					name="course"
					onChange={changeHandler}
					placeholder={props.profile.course}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleAddress2">Class :</label>
				<input
					className="form-input"
					type="text"
					name="class"
					onChange={changeHandler}
					placeholder={props.profile.class}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleCity">City : </label>
				<input
					className="form-input"
					type="text"
					name="city"
					onChange={changeHandler}
					placeholder={props.profile.city}
					value={userDetails.city}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleState">State :</label>
				<input
					className="form-input"
					type="text"
					name="state"
					onChange={changeHandler}
					placeholder={props.profile.state}
					value={userDetails.state}
				/>
			</div>
			<div className="input-box">
				<label htmlFor="exampleState">old password</label>
				<input className="form-input" type="text" name="oldpassword" onChange={changeHandler} />
			</div>
			<div className="input-box">
				<label htmlFor="exampleState">new password</label>
				<input className="form-input" type="text" name="newpassword" onChange={changeHandler} />
			</div>
			<h6>{props.passmsg}</h6>
			{/* Avatar Selection */}
			<span className="choose-avatar">Choose Your Avatar</span>
			<div className="avatar-options">
				<div className="avatar-option">
					<label htmlFor="avatar1">
						<input
							className="avatar-input"
							type="radio"
							name="avatar"
							id="avatar1"
							onChange={avatarChangeHandler}
							value="1"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar1.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar2">
						<input
							className="avatar-input"
							type="radio"
							name="avatar"
							id="avatar2"
							onChange={avatarChangeHandler}
							value="2"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar2.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar3">
						<input
							className="avatar-input"
							type="radio"
							name="avatar"
							id="avatar3"
							onChange={avatarChangeHandler}
							value="3"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar3.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar4">
						<input
							className="avatar-input"
							type="radio"
							name="avatar"
							id="avatar4"
							onChange={avatarChangeHandler}
							value="4"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar4.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					{/* {avatar === '5' ? <div className="selected-overlay" /> : null} */}
					<label htmlFor="avatar5">
						<input
							type="radio"
							className="avatar-input"
							name="avatar"
							id="avatar5"
							onChange={avatarChangeHandler}
							value="5"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar5.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar6">
						<input
							type="radio"
							className="avatar-input"
							name="avatar"
							id="avatar6"
							onChange={avatarChangeHandler}
							value="6"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar6.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar7">
						<input
							type="radio"
							className="avatar-input"
							name="avatar"
							id="avatar7"
							onChange={avatarChangeHandler}
							value="7"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar7.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
				<div className="avatar-option">
					<label htmlFor="avatar8">
						<input
							className="avatar-input"
							type="radio"
							name="avatar"
							id="avatar8"
							onChange={avatarChangeHandler}
							value="8"
						/>
						<div className="image-container">
							<img
								className="avatar"
								src={'http://localhost:5000/static/Avatars/72ppi/avatar8.png'}
								alt="avatar"
							/>
							<div class="after" />
						</div>
					</label>
				</div>
			</div>
			{/* <Button onClick={}>Change Avatar</Button> */}
			<button
				className="update-profile-button"
				onClick={() =>
					props.updateUser(
						avatar,
						userDetails.phonenumber,
						userDetails.city,
						userDetails.state,
						userDetails.email,
						props.profile._id
					)}
			>
				Update Profile
			</button>
			<button
				className="update-profile-button"
				onClick={() =>
					props.changePassword(props.user.username, userDetails.oldpassword, userDetails.newpassword)}
			>
				change password
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		passmsg: state.user.passmsg,
		user: state.user.userDetails,
		profile: state.user.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateUser: function(avatar, phonenumber, city, state, email, profileid) {
			dispatch(updateUser(avatar, phonenumber, city, state, email, profileid));
		},
		changePassword: function(username, oldpassword, newpassword) {
			dispatch(changePassword(username, oldpassword, newpassword));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
