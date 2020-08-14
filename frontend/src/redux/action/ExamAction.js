import { UPLOAD_QUESTION, UPLOAD_SECDETAILS, UPLOAD_EXAMDETAILS, GET_SEC, DELETE_SEC, DELETE_QUE } from './AdminType';

const axios = require('axios');

export const uploaddetail = (examname, classs, course, description) => {
	return function(dispatch) {
		console.log(classs, course);
		var config = {
			method: 'post',
			url: '/uploaddetail',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				examname: examname,
				classs: classs,
				course: course,
				description: description
			}
		};

		axios(config)
			.then(function(response) {
				localStorage.setItem('examid', response.data._id);
				dispatch({
					type: UPLOAD_EXAMDETAILS,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const secdetail = (secname, subject, positive, negative, typeofques, numques, examid) => {
	return function(dispatch) {
		var config = {
			method: 'put',
			url: '/secdetail/' + examid,
			headers: {
				'content-type': 'application/json'
			},
			data: {
				subject: subject,
				secname: secname,
				positive: positive,
				negative: negative,
				numques: numques,
				typeofques: typeofques
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: UPLOAD_SECDETAILS,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const quedetail = (question, option1, option2, option3, option4, tags, correct, examid, secid) => {
	let Tags;
	Tags = [ ...tags ];
	console.log(question);
	return function(dispatch) {
		const formData = new FormData();
		if (question.type === 'image/jpeg' || question.type === 'image/png' || question.type === 'image/jpg') {
			formData.append('questionfile', question);
		} else {
			formData.append('question', question);
		}
		if (option1.type === 'image/jpeg' || option1.type === 'image/png' || option1.type === 'image/jpg') {
			formData.append('option1file', option1);
		} else {
			formData.append('option1', option1);
		}
		if (option2.type === 'image/jpeg' || option2.type === 'image/png' || option2.type === 'image/jpg') {
			formData.append('option2file', option2);
		} else {
			formData.append('option2', option2);
		}
		if (option3.type === 'image/jpeg' || option3.type === 'image/png' || option3.type === 'image/jpg') {
			formData.append('option3file', option3);
		} else {
			formData.append('option3', option3);
		}
		if (option4.type === 'image/jpeg' || option4.type === 'image/png' || option4.type === 'image/jpg') {
			formData.append('option4file', option4);
		} else {
			formData.append('option4', option4);
		}
		formData.append('correct', correct);
		formData.append('Tags', JSON.stringify(Tags));
		console.log(Tags);
		var config = {
			method: 'put',
			url: '/ques/' + examid + '/' + secid,
			headers: {
				'content-type': 'application/json'
			},
			processData: false,
			data: formData
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: UPLOAD_QUESTION,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const getsec = (examid) => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/getsec/' + examid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: GET_SEC,

					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const deletesec = (examid, secid) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/deletesec',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				examid,
				secid
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: DELETE_SEC,

					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const deleteque = (examid, secid, queid) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/deleteque',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				examid,
				secid,
				queid
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: DELETE_QUE,

					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
