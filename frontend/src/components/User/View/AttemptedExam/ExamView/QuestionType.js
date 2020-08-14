import React from 'react';
import { connect } from 'react-redux';

export const QuestionType = (props) => {
	switch (props.section.typeofques) {
		case 'scq':
			questiontype = (
				<div>
					<input name="scq" id="opt1" type="radio" autoComplete="off" />
					<div>{option1}</div>
					<input name="scq" id="opt2" type="radio" />
					<div>{option2}</div>
					<input name="scq" id="opt3" type="radio" />
					<div>{option3}</div>
					<input name="scq" id="opt4" type="radio" />
					<div>{option4}</div>
				</div>
			);
			break;
		case 'mcq':
			questiontype = (
				<div>
					<input name="opt1" id="opt1" type="checkbox" />
					<label htmlFor="opt1">{props.ques.option1}</label>
					<input name="opt2" id="opt2" type="checkbox" />
					<label htmlFor="opt2">{props.ques.option2}</label>
					<input name="opt3" id="opt3" type="checkbox" />
					<label htmlFor="opt1">{props.ques.option3}</label>
					<input name="opt4" id="opt4" type="checkbox" />
					<label htmlFor="opt4">{props.ques.option4}</label>
				</div>
			);
			break;
		case 'int':
			questiontype = (
				<div>
					<input id="int" type="number" />
				</div>
			);
			break;
		default:
			return;
	}
};


const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(QuestionType);
