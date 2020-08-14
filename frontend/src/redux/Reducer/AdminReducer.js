import {
	SIGNUP_ADMIN,
	LOGIN_ADMIN,
	SET_CURRENT_ADMIN,
	LOGOUT_ADMIN,
	SHOWADMIN_PROFILE,
	UPDATEADMIN_PROFILE,
	STUDENT_LIST,
	GET_EXAMS,
	DELETE_EXAM,
	HOST_EXAM,
	HOSTED_EXAM,
	RANK_LIST
} from '../action/AdminType';

const initialState = {
	adminisLoggedIn: false,
	adminusername: '',
	adminemail: '',
	admin_id: '',
	adminpassword: '',
	adinconfirmPassword: '',
	adminaction: 'Signup',
	adminmsg: '',
	profile: {},
	adminDetails: {},
	type: 'Coaching',
	student: {},
	Loading: true,
	studentloading: true,
	allexamloading: true,
	exam: [],
	hostedexam: [],
	hostedloading: true,
	ranklist: [],
	rankloading: true
};

const AdminReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_ADMIN:
			return {
				...state,
				adminmsg: action.payload
			};
		case LOGIN_ADMIN:
			return {
				...state,
				adminmsg: action.payload,
				isLoggedIn: action.isLoggedIn
			};
		case SET_CURRENT_ADMIN:
			return {
				...state,
				adminDetails: action.payload,
				isLoggedIn: true
			};
		case LOGOUT_ADMIN:
			return {
				...state,
				isLoggedIn: false
			};
		case SHOWADMIN_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case UPDATEADMIN_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case STUDENT_LIST:
			return {
				...state,
				student: action.payload,
				studentloading: false
			};
		case GET_EXAMS:
			return {
				...state,
				exam: action.payload,
				allexamloading: false
			};
		case DELETE_EXAM:
			let reqindex;
			state.exam.forEach((exam, index) => {
				if (action.payload === exam._id) reqindex = index;
			});

			return {
				...state,
				exam: [ ...state.exam.slice(0, reqindex), ...state.exam.slice(reqindex + 1) ]
			};
		case HOST_EXAM:
			let req_index;
			state.exam.forEach((exam, index) => {
				if (action.payload === exam._id) req_index = index;
			});

			return {
				...state,
				exam: [ ...state.exam.slice(0, req_index), ...state.exam.slice(req_index + 1) ]
			};
		case HOSTED_EXAM:
			return {
				...state,
				hostedexam: action.payload,
				hostedloading: false
			};
		case RANK_LIST:
			return {
				...state,
				ranklist: action.payload,
				rankloading: false
			};
		default:
			return state;
	}
};

export default AdminReducer;
