import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptedExam } from '../../../../../redux';
export const AttemptedExam = (props) => {
	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(attemptedExam(props.user.userid));
		},
		[ props.user.userid ]
	);

	const attemptedEXAM = props.attemptedexamloading ? (
		<h2>Loading</h2>
	) : (
		<div>
			{props.attemptedexam.map((attemptedexam,index) => {
				return (
					<div key={index}>
						<h3>{attemptedexam.total}</h3>
						<h3>{attemptedexam.examname}</h3>
						<Link to={'/exam-analysis/' + attemptedexam.examid}>
							<button>Analysis</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
	return (
		<div>
			<div>{attemptedEXAM}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user.userDetails,
		attemptedexam: state.user.attemptedexam,
		attemptedexamloading: state.user.attemptedexamloading
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttemptedExam);
