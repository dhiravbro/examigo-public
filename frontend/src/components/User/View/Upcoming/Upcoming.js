import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showexam, attemptexam } from '../../../../redux';
import moment from 'moment';
import './Upcoming.css';

function Upcoming(props) {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(showexam(props.profile.coaching, props.profile.course));
		},
		[ props.profile.coaching, props.profile.course ]
	);
	const currentMoment = moment();

	const examDetails = props.user.examloading ? (
		<h1>Loading</h1>
	) : (
		props.user.exam.map((exam, index) => {
			const examMoment = moment(exam.examdate);
			let duration = moment.duration(currentMoment.diff(examMoment));
			let style;
			if (moment(examMoment).isAfter(currentMoment)) {
				style = { display: 'none' };
			}
			let timer = moment.duration(duration).timer;
			if (moment(examMoment).isSame(currentMoment)) {
				timer.start();
			}
			const examDay = examMoment.format('D-MM-YY');
			const examTime = examMoment.format('HH:mm a');
			return (
				<div className="UpcomingExam" key={index}>
					<div className="ExamName">{exam.examname}</div>
					<div className="Course">{exam.course}</div>
					<div className="Description">{exam.description}</div>
					<div className="ExamDate">{examDay}</div>
					<div className="ExamTime">{examTime}</div>
					<div className="Duration">{exam.duration}</div>
					<button
						style={style}
						className="Attempt"
						onClick={() => {
							props.attemptexam(exam._id, props.user.userDetails.userid, props.user.userDetails.username);
						}}
					>
						Attempt
					</button>
				</div>
			);
		})
	);

	return <div>{examDetails}</div>;
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		profile: state.user.profile
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		showexam: function(coaching, course) {
			dispatch(showexam(coaching, course));
		},
		attemptexam: function(examid, userid, username, timeRemaining) {
			dispatch(attemptexam(examid, userid, username));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
