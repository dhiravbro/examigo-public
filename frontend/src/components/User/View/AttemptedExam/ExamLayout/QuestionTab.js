import React from 'react';
import { connect } from 'react-redux';
import './QuestionTab.css';

export const QuestionTab = (props) => {
	return (
		<div>
			{props.sec.question.map((ques, index) => {
				return (
					<div className="QuestionTab" key={index} onClick={() => props.changeQues(index)}>
						{index + 1}
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = (state) => ({
	ques: state.user.attemptexam.sec[0].question
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTab);
