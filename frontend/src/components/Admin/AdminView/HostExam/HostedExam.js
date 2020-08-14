import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HostedExam.css';
const HostedExam = (props) => {
	const hostedExamList = props.hostedloading ? (
		<p>Loading</p>
	) : (
		props.hostedexam.map((exam, index) => {
			return (
				<div className="hosted-exam" key={index}>
					<div className="examname-des-div">
						<p className="hosted-examname">{exam.examname}</p>
						<p className="hosted-description">{exam.description}</p>
					</div>
					<div className="course-class-div">
						<p className="hosted-exam-course">{exam.course.toUpperCase()}</p>
						<p className="hosted-exam-class">{exam.class}</p>
					</div>
					<div className="hosted-exam-icon">
						<i class="fas fa-chart-pie" />
						<Link to={'/examperformance/' + exam._id}>Analysis</Link>
					</div>
				</div>
			);
		})
	);

	return <div className="hosted-exam-view">{hostedExamList}</div>;
};

const mapStateToProps = (state) => ({
	hostedexam: state.admin.hostedexam,
	hostedloading: state.admin.hostedloading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HostedExam);
