import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './Reducer/userReducer';
import AdminReducer from './Reducer/AdminReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ExamReducer from './Reducer/ExamReducer';
const thunkMiddleware = require('redux-thunk').default;

const mainReducer = combineReducers({
	user: userReducer,
	admin: AdminReducer,
	exam: ExamReducer
});

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
