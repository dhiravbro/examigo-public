import {
	UPLOAD_EXAMDETAILS,
	UPLOAD_SECDETAILS,
	UPLOAD_QUESTION,
	GET_SEC,
	DELETE_SEC,
	DELETE_QUE
} from '../action/AdminType';

const initialState = {
	exam: {},
	examdetails: {},
	sec: [],
	question: [],
	loading: true,
	secloading: true,
	quesloading: true
};

const ExamReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_EXAMDETAILS:
			return {
				...state,
				examdetails: action.payload,
				loading: false
			};
		case GET_SEC:
			return {
				...state,
				sec: [ ...action.payload ],
				loading: false
			};
		case UPLOAD_SECDETAILS:
			return {
				...state,
				sec: [ ...action.payload ],
				secloading: false
			};
		case DELETE_SEC:
			return {
				...state,
				sec: [ ...action.payload ],
				secloading: false
			};
		case DELETE_QUE:
			return {
				...state,
				sec: [ ...action.payload ],
				secloading: false
			};
		case UPLOAD_QUESTION:
			return {
				...state,
				sec: [ ...action.payload ],
				quesloading: false
			};

		default:
			return state;
	}
};

export default ExamReducer;
