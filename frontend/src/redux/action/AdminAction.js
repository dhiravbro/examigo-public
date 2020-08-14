import {
	SIGNUP_ADMIN,
	LOGIN_ADMIN,
	SET_CURRENT_ADMIN,
	LOGOUT_ADMIN,
	SHOWADMIN_PROFILE,
	UPDATEADMIN_PROFILE,
	STUDENT_LIST,
	GET_EXAMS,
	HOST_EXAM,
	HOSTED_EXAM,
	DELETE_EXAM,
	RANK_LIST
} from './AdminType';
import setAuthenticationToken from './setAuthenticationToken';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const signupAdmin = (username, email, password, confirmPassword) => {
	return (dispatch) => {
		let OPTIONS = {
			url: 'adminsignup',
			method: 'POST',

			data: {
				username: username,
				email: email,
				password: password,
				confirmpassword: confirmPassword
			},

			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS)
			.then((res) => {
				const message = res.data.message;
				dispatch({ type: SIGNUP_ADMIN, payload: message });
			})
			.catch((err) => console.log(err));
	};
};

export const loginAdmin = (username, password) => {
	return (dispatch) => {
		let OPTIONS = {
			url: 'adminlogin',

			method: 'POST',

			data: {
				username: username,
				password: password
			},
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS)
			.then((res) => {
				const message = res.data.message;

				if (message === 'User Found') {
					const token = res.data.token;
					localStorage.setItem('Admintoken', token);
					setAuthenticationToken(token);
					// console.log(jwt.decode(token));
					dispatch(setCurrentAdmin(jwt.decode(token)));

					dispatch({ type: LOGIN_ADMIN, payload: message, isLoggedIn: true });
				} else {
					dispatch({ type: LOGIN_ADMIN, payload: message, isLoggedIn: false });
				}
			})
			.catch((err) => console.log(err));
	};
};

export const setCurrentAdmin = (admin) => ({ type: SET_CURRENT_ADMIN, payload: admin });

export const logoutAdmin = () => {
	return function(dispatch) {
		localStorage.removeItem('Admintoken');
		setAuthenticationToken(false);
		dispatch(setCurrentAdmin({}));
		dispatch({ type: LOGOUT_ADMIN });
		window.location.href = '/';
	};
};
export const showAdmin = (adminid) => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/adminprofile/' + adminid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				const profile = res.data;

				dispatch({
					type: SHOWADMIN_PROFILE,
					payload: profile
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const updateAdmin = (avatar, phonenumber, city, state, email, profileid) => {
	return function(dispatch) {
		var config = {
			method: 'patch',
			data: {
				avatar: avatar,
				profileid: profileid,
				phonenumber: phonenumber,
				city: city,
				state: state,
				email: email
			},
			url: '/updateprofile',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				const profile = res.data;

				dispatch({
					type: UPDATEADMIN_PROFILE,
					payload: profile
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const getstudent = (userid) => {
	return (dispatch) => {
		let config = {
			method: 'post',
			data: {
				userid: userid
			},
			url: '/students',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				dispatch({ type: STUDENT_LIST, payload: res.data });
			})
			.catch((error) => console.log(error));
	};
};
export const getallexams = (id) => {
	return (dispatch) => {
		let OPTIONS = {
			url: 'allexam/' + id,
			method: 'get',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS).then((res) => dispatch({ type: GET_EXAMS, payload: res.data })).catch((err) => console.log(err));
	};
};
export const hostexam = (id, date, duration) => {
	return (dispatch) => {
		let OPTIONS = {
			url: '/finalstep',
			method: 'patch',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				id: id,
				date: date,
				duration: duration
			}
		};

		axios(OPTIONS).then((res) => dispatch({ type: HOST_EXAM, payload: res.data })).catch((err) => console.log(err));
	};
};

export const hostedexam = (id) => {
	return (dispatch) => {
		let OPTIONS = {
			url: '/hostedexam/' + id,
			method: 'get',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				id: id
			}
		};

		axios(OPTIONS)
			.then((res) => dispatch({ type: HOSTED_EXAM, payload: res.data }))
			.catch((err) => console.log(err));
	};
};
export const deleteExam = (examid) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/deletepaper',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				examid
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: DELETE_EXAM,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const ranklist = (id) => {
	return (dispatch) => {
		let OPTIONS = {
			url: '/ranklist/' + id,
			method: 'get',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS).then((res) => dispatch({ type: RANK_LIST, payload: res.data })).catch((err) => console.log(err));
	};
};
