import React, {  useEffect,useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showexam, attemptexam, examAnalysis } from '../../../../redux';
import moment from 'moment';
import './Upcoming.css';

function AllTest(props) {
	const dispatch = useDispatch();
	const [testFilter , setTestFilter] =useState('all');
	const changeTabs = (event) => {
		setTestFilter(event.target.value);
	}
	useEffect(
		() => {
			dispatch(showexam(props.profile.coaching, props.profile.course));
		},
		[ props.profile.coaching, props.profile.course ]
	);
	const currentMoment = moment();
	let style;
	const examDetails = props.user.examloading ? (
		<h1>Loading</h1>
	) : (
		props.user.exam.map((exam, index) => {
			let showButton = true;
			const examMoment = moment(exam.examdate);
			const button = exam.attemptedstudent.includes(props.user.userDetails.userid) ? (
				<Link to={'/exam-analysis/' + exam._id}>
					<button
						style={style}
						className="Analysis"
						onClick={() => {
							props.examAnalysis(props.user.userDetails.userid, exam._id);
						}}
					>
						Analysis
					</button>
				</Link>
			) : (
				<button
					style={style}
					className="Attempt"
					onClick={() => {
						props.attemptexam(exam._id, props.user.userDetails.userid, props.user.userDetails.username);
					}}
				>
					Attempt
				</button>
			);

			if (moment(examMoment).isAfter(currentMoment)) {
				showButton = false;
			}
			const examDay = examMoment.format('D-MM-YY');
			const examTime = examMoment.format('HH:mm');
			const examDuration = moment.duration(exam.duration, 'seconds');
			const examHours = examDuration.get('hours');
			const examMinutes = examDuration.get('minutes');
			const examElement = 
				(<div className="UpcomingExam" key={index}>
					<div className="exam-date-time">
						<span className="ExamDate">{examDay}</span>
						<span className="ExamTime">{examTime}</span>
					</div>
					<div className="exam-info-div">
						<div className="exam-info">
							<span className="ExamName">{exam.examname}</span>
							<span className="Description">{exam.description}</span>
						</div>
						<span className="Duration">
							<span>{examHours} hours </span>
							<span>{examMinutes} minutes</span>
						</span>
						{showButton ? button : null}
					</div>
				</div>
			);

			if ( testFilter === 'all'){
				return examElement;
			}
			else if (testFilter === 'upcoming' && showButton === false){
				return examElement;
			}
			else if (testFilter === 'unattempted' && moment(examMoment.clone().add(examDuration)).isBefore(currentMoment)){
				return examElement;
			}
			else if (testFilter === 'attempted' && exam.attemptedstudent.includes(props.user.userDetails.userid)){
				return examElement;
			}
		})
	);

	return (
		<div className="test-view">
			<p className="alltest-title">Tests</p>
			<div className = "test-filter-div"><span><i className="fas fa-filter"></i></span>
			<select className = "test-filter " name = "testFilter" onChange={changeTabs} value={testFilter}>
			<option value="all">  All Tests</option>
			<option value ="upcoming"> Upcoming Tests</option>
			<option value ="attempted"> Attempted Tests </option>
			<option value ="unattempted"> Unattempted Tests </option>
			</select></div>
			
			
			<div className="AllTest">{examDetails}</div>
		</div>
	);
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
		},
		examAnalysis: function(userid, examid) {
			dispatch(examAnalysis(userid, examid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTest);
