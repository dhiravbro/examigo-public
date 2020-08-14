import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { quedetail, getsec, deleteque } from '../../../../redux';
import './Uploadque.css';
import { Link } from 'react-router-dom';
import QuestionPreview from './QuestionPreview';
import InputArea from './InputArea';
import AddTags from './AddTags';
import InputType from './InputType';
import FileInput from './FileInput';

function UploadQue(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getsec(localStorage.examid));
	}, []);

	const [ quesDetails, setQuesDetails ] = useState({
		question: '',
		option1: '',
		option2: '',
		option3: '',
		option4: '',
		correct: '',
		tag: '',
		selectedSection: null
	});
	const [ selectedInput, setSelectedInput ] = useState();
	const [ inputType, setInputType ] = useState({
		question: '',
		option1: '',
		option2: '',
		option3: '',
		option4: ''
	});

	const inputTypeHandler = (event) => {
		const { name, value } = event.target;

		// if (value.files[0]) {
		// 	var reader = new FileReader();
		// 	reader.readAsDataURL(quesDetails[selectedInput]);
		// 	reader.onloadend = function() {
		// 		document.getElementById('output').setAttribute('src', reader.result);
		// 	};
		// }

		setInputType((prevValue) => {
			return {
				...prevValue,
				[name]: value
			};
		});
		setQuesDetails((prevValue) => {
			return {
				...prevValue,
				[name]: ''
			};
		});
		setSelectedInput(name);
		console.log(quesDetails);
	};

	const showPreview = () => {
		let img = document.getElementById('output');
		img.file = quesDetails[selectedInput];
		const reader = new FileReader();
		reader.onload = (function(aImg) {
			return function(e) {
				aImg.src = e.target.result;
			};
		})(img);
		reader.readAsDataURL(quesDetails[selectedInput]);
	};

	const changeHandler = (event) => {
		const name = event.target.name;
		const type = event.target.getAttribute('data-type');
		console.log(quesDetails);
		if (type === 'text') {
			const value = event.target.value;
			setQuesDetails((prevValue) => {
				return {
					...prevValue,
					[name]: value
				};
			});
		} else {
			const files = event.target.files;
			setQuesDetails((prevValue) => {
				const newObj = { ...prevValue, [name]: '' };
				return {
					...newObj,
					[name]: files[0]
				};
			});
		}
		// output.src = URL.createObjectURL(event.target.files[0]);
		// console.log(output.srcObject);
		// output.onload = function() {
		// 	URL.revokeObjectURL(output.src); // free memory
		// };
		// }
	};

	const [ tags, setTags ] = useState([]);

	const removeTag = (index) => {
		let tagArray = [ ...tags.slice(0, index), ...tags.slice(index + 1) ];
		setTags(tagArray);
	};
	const addTag = (tag) => {
		setTags([ ...tags, tag ]);
	};

	const nextQuestionHandler = (event) => {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			console.log('hello');
		}

		let correctAns = [];
		if (!(props.match.params.typeofques === 'int')) {
			for (let i = 1; i < 5; i++) {
				if (document.getElementById('opt' + i).checked) {
					correctAns = [ ...correctAns, i.toString() ];
				}
			}
			if (correctAns.length !== 0) {
				props.quedetail(
					quesDetails.question,
					quesDetails.option1,
					quesDetails.option2,
					quesDetails.option3,
					quesDetails.option4,
					tags,
					correctAns,
					localStorage.examid,
					props.match.params.id
				);
				// document.getElementsByName('question')[0].value = '';
				for (let i = 1; i < 5; i++) {
					// document.getElementsByName('option' + i)[0].value = '';
					document.getElementById('opt' + i).checked = false;
				}
			}
		} else {
			correctAns.push(document.getElementById('int').value);
			if (correctAns.length !== 0) {
				props.quedetail(
					quesDetails.question,
					quesDetails.option1,
					quesDetails.option2,
					quesDetails.option3,
					quesDetails.option4,
					tags,
					correctAns,
					props.exam._id,
					props.match.params.id
				);
			}
		}
	};
	let input = null;
	switch (inputType[selectedInput]) {
		case 'file':
			input = (
				// <FileInput
				// 	name={selectedInput}
				// 	accept="image/*"
				// 	value={quesDetails[selectedInput]}
				// 	onChange={changeHandler}
				// />
				<input name={selectedInput} type="file" data-type="file" onChange={changeHandler} />
			);
			break;
		case 'text':
			input = (
				<textarea
					name={selectedInput}
					value={quesDetails[selectedInput]}
					data-type="text"
					onChange={changeHandler}
				/>
			);
	}

	return (
		<div>
			<InputArea
				questype={props.match.params.typeofques}
				changeHandler={changeHandler}
				quesDetails={quesDetails}
				inputTypeHandler={inputTypeHandler}
			/>
			<div>
				{selectedInput}
				{/* <InputType
					value={quesDetails[selectedInput]}
					type={inputType[selectedInput]}
					changeHandler={changeHandler}
				/> */}
				{input}
			</div>
			<button
				variant="primary"
				onClick={(event) => {
					nextQuestionHandler(event);
				}}
			>
				Next
			</button>
			<button onClick={showPreview}>Show Preview</button>
			<img id="output" />
			<AddTags subject={props.match.params.subject} removeTag={removeTag} addTag={addTag} tags={tags} />
			<QuestionPreview sec={props.sec} secid={props.match.params.id} />
			<Link to="/secdetails">add new sec/</Link>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		exam: state.exam.examdetails,
		sec: state.exam.sec,
		question: state.exam.question
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		quedetail: function(question, option1, option2, option3, option4, tags, correct, examid, secid) {
			dispatch(quedetail(question, option1, option2, option3, option4, tags, correct, examid, secid));
		},
		deleteque: function(examid, secid, queid) {
			dispatch(deleteque(examid, secid, queid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadQue);
