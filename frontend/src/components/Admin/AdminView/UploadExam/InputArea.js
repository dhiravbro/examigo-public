import React from 'react';
import { connect } from 'react-redux';
import QuestionInput from './QuestionInput';
import InputButtons from './InputButtons';
const InputArea = (props) => {
	let optionType;
	switch (props.questype) {
		case 'int':
			optionType = 'checkbox';
			break;
		case 'mcq':
			optionType = 'checkbox';
			break;
		case 'scq':
			optionType = 'radio';
			break;
		default:
			optionType = 'checkbox';
			break;
	}

	console.log(optionType);
	return (
		<div>
			{props.questype === 'int' ? (
				<div>
					<InputButtons label="question" inputTypeHandler={props.inputTypeHandler} />
					<div>
						<span>Input Correct answer :</span>
						<input className="option" type="number" placeholder="Enter Correct Integer Value" id="int" />
					</div>
				</div>
			) : (
				<div>
					<div>
						<InputButtons label="question" inputTypeHandler={props.inputTypeHandler} />
					</div>

					<div>
						<input type={optionType} name="option" id="opt1" />
						<InputButtons label="option1" inputTypeHandler={props.inputTypeHandler} />
					</div>

					<div>
						<input type={optionType} name="option" id="opt2" />
						<InputButtons label="option2" inputTypeHandler={props.inputTypeHandler} />
					</div>

					<div>
						<input type={optionType} name="option" id="opt3" />
						<InputButtons label="option3" inputTypeHandler={props.inputTypeHandler} />
					</div>

					<div>
						<input type={optionType} name="option" id="opt4" />
						<InputButtons label="option4" inputTypeHandler={props.inputTypeHandler} />
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputArea);
