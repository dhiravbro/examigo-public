import React from 'react';
import { connect } from 'react-redux';
import { deleteque } from '../../../../redux';
const QuestionPreview = (props) => {
	return (
		<div>
			{props.sec.length > 0 ? (
				props.sec
					.filter((section) => {
						return section._id === props.secid;
					})[0]
					.question.map((Question, index) => {
						return (
							<div key={index}>
								<span>{index + 1}</span>
								{Question.question.slice(0, 11) === 'Examigofile' ? (
									<img
										src={'http://localhost:5000/static/uploads/' + Question.question}
										alt="product"
									/>
								) : (
									<span>{Question.question}</span>
								)}
								{Question.option1.slice(0, 11) === 'Examigofile' ? (
									<img
										src={'http://localhost:5000/static/uploads/' + Question.option1}
										alt="product"
									/>
								) : (
									<span>{Question.option1}</span>
								)}
								{Question.option2.slice(0, 11) === 'Examigofile' ? (
									<img
										src={'http://localhost:5000/static/uploads/' + Question.option2}
										alt="product"
									/>
								) : (
									<span>{Question.option2}</span>
								)}
								{Question.option3.slice(0, 11) === 'Examigofile' ? (
									<img
										src={'http://localhost:5000/static/uploads/' + Question.option3}
										alt="product"
									/>
								) : (
									<span>{Question.option3}</span>
								)}
								{Question.option4.slice(0, 11) === 'Examigofile' ? (
									<img
										src={'http://localhost:5000/static/uploads/' + Question.option4}
										alt="product"
									/>
								) : (
									<span>{Question.option4}</span>
								)}
								<button onClick={() => props.deleteque(localStorage.examid, props.secid, Question._id)}>
									Delete Question
								</button>
							</div>
						);
					})
			) : null}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteque: function(examid, secid, queid) {
			dispatch(deleteque(examid, secid, queid));
		}
	};
};

export default connect(null, mapDispatchToProps)(QuestionPreview);
