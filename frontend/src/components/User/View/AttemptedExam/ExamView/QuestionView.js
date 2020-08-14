import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { attemptquestion, calculation } from '../../../../../redux/index';
import Buttons from './Buttons';
import './QuestionView.css';
export const QuestionView = (props) => {
	const [ answer, setAnswer ] = useState({
		'1': false,
		'2': false,
		'3': false,
		'4': false
	});
	const [ int, setInt ] = useState();

	useEffect(
		() => {
			setAnswer(
				{
					'1': false,
					'2': false,
					'3': false,
					'4': false
				},
				[ props.secno, props.quesno ]
			);
			const resObj = props.getResponse(props.ques._id);
			console.log(resObj);
			console.log(props);
			if (resObj) {
				console.log('int');
				if (resObj.questype === 'int') {
					setInt(resObj.res[0]);
				} else {
					console.log('mcq');
					resObj.res.forEach((element) => {
						setAnswer((prevValue) => {
							console.log('setanswer me ghus rha');
							return {
								...prevValue,
								[element]: true
							};
						});
					});
				}
			}
		},
		[ props.ques._id ]
	);

	const changeHandler = (event) => {
		const value = event.target.value;
		setAnswer((prevValue) => {
			console.log('setanswer me ghus rha');
			return {
				...prevValue,
				[value]: true
			};
		});
	};

	const intChangeHandler = (event) => {
		const value = event.target.value;
		setInt(value);
	};

	const question =
		props.ques.question.slice(0, 11) === 'Examigofile' ? (
			<img src={'http://localhost:5000/static/uploads/' + props.ques.question} alt="product" />
		) : (
			<span>{props.ques.question}</span>
		);
	const option1 =
		props.ques.option1.slice(0, 11) === 'Examigofile' ? (
			<img src={'http://localhost:5000/static/uploads/' + props.ques.option1} alt="product" />
		) : (
			<span>{props.ques.option1}</span>
		);
	const option2 =
		props.ques.option2.slice(0, 11) === 'Examigofile' ? (
			<img src={'http://localhost:5000/static/uploads/' + props.ques.option2} alt="product" />
		) : (
			<span>{props.ques.option2}</span>
		);
	const option3 =
		props.ques.option3.slice(0, 11) === 'Examigofile' ? (
			<img src={'http://localhost:5000/static/uploads/' + props.ques.option3} alt="product" />
		) : (
			<span>{props.ques.option3}</span>
		);
	const option4 =
		props.ques.option4.slice(0, 11) === 'Examigofile' ? (
			<img src={'http://localhost:5000/static/uploads/' + props.ques.option4} alt="product" />
		) : (
			<span>{props.ques.option4}</span>
		);

	const nextQuestionHandler = (visited) => {
		let answerMark = [];
		if (props.section.typeofques !== 'int') {
			for (let i = 1; i < 5; i++) {
				if (document.getElementById('opt' + i.toString()).checked) {
					answerMark = [ ...answerMark, i.toString() ];
				}
			}
		} else {
			answerMark.push(document.getElementById('int').value);
		}
		props.attemptquestion(
			props.exam._id,
			props.user.userid,
			props.section.subject,
			props.section._id,
			props.ques._id,
			answerMark
		);
		props.editResponse({
			questype: props.section.typeofques,
			res: answerMark,
			quesid: props.ques._id,
			visited: visited
		});
		if (props.quesno + 1 < props.section.question.length) {
			props.changeQues(props.quesno + 1);
		} else {
			if (props.secno + 1 < props.sec.length) {
				props.changeSec(props.secno + 1);
			}
		}
		if (!(props.secno + 1 === props.sec.length)) {
			setAnswer({
				'1': false,
				'2': false,
				'3': false,
				'4': false
			});
		}
	};

	let questiontype;
	switch (props.section.typeofques) {
		case 'scq':
			questiontype = (
				<div>
					<div className="question-option">
						<input
							name="scq"
							id="opt1"
							type="radio"
							checked={answer['1']}
							value="1"
							onChange={changeHandler}
						/>
						<span>{option1}</span>
					</div>
					<div className="question-option">
						<input
							name="scq"
							id="opt2"
							type="radio"
							checked={answer['2']}
							value="2"
							onChange={changeHandler}
						/>
						<span>{option2}</span>
					</div>
					<div className="question-option">
						<input
							name="scq"
							id="opt3"
							type="radio"
							checked={answer['3']}
							value="3"
							onChange={changeHandler}
						/>
						<span>{option3}</span>
					</div>
					<div className="question-option">
						<input
							name="scq"
							id="opt4"
							type="radio"
							checked={answer['4']}
							value="4"
							onChange={changeHandler}
						/>
						<span>{option4}</span>
					</div>
				</div>
			);
			break;
		case 'mcq':
			questiontype = (
				<div>
					<div className="question-option">
						<input
							name="opt1"
							id="opt1"
							type="checkbox"
							checked={answer['1']}
							value="1"
							onChange={changeHandler}
						/>
						<label htmlFor="opt1">{props.ques.option1}</label>
					</div>
					<div className="question-option">
						<input
							name="opt2"
							id="opt2"
							type="checkbox"
							checked={answer['2']}
							value="2"
							onChange={changeHandler}
						/>
						<label htmlFor="opt2">{props.ques.option2}</label>
					</div>
					<div className="question-option">
						<input
							name="opt3"
							id="opt3"
							type="checkbox"
							checked={answer['3']}
							value="3"
							onChange={changeHandler}
						/>
						<label htmlFor="opt3">{props.ques.option3}</label>
					</div>
					<div className="question-option">
						<input
							name="opt4"
							id="opt4"
							type="checkbox"
							checked={answer['4']}
							value="4"
							onChange={changeHandler}
						/>
						<label htmlFor="opt4">{props.ques.option4}</label>
					</div>
				</div>
			);
			break;
		case 'int':
			questiontype = (
				<div>
					<input
						type="text"
						id="int"
						value={int}
						onInput={(this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
						onChange={intChangeHandler}
					/>
				</div>
			);
			break;
		default:
			return;
	}

	return (
		<div>
			<div className="question-div">
				<div className="question">{question}</div>
				<div className="options">{questiontype}</div>
			</div>
			<Buttons
				mark={() => nextQuestionHandler(2)}
				clear={() => {
					setAnswer({
						'1': false,
						'2': false,
						'3': false,
						'4': false
					});
					props.clearResponse(props.ques._id);
					props.attemptquestion(
						props.exam._id,
						props.user.userid,
						props.section.subject,
						props.section._id,
						props.ques._id,
						[]
					);
				}}
				save={() => nextQuestionHandler(1)}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	exam: state.user.attemptexam,

	user: state.user.userDetails
});

const mapDispatchToProps = (dispatch) => {
	return {
		attemptquestion: function(examid, userid, subject, secid, questionid, mark) {
			dispatch(attemptquestion(examid, userid, subject, secid, questionid, mark));
		},
		calculation: function(examid, userid) {
			dispatch(calculation(examid, userid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
// for (let i = 1; i < 5; i++) {
// 	document.getElementById('opt' + i.toString()).checked = false;
// }
