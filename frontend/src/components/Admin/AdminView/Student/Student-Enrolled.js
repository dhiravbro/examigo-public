import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getstudent } from '../../../../redux';
import './Student-Enrolled.css';
function Student(props) {
	const dispatch = useDispatch();
	const [ course, setCourse ] = useState('jee');
	const [ standard, setStandard ] = useState('12');

	const changeCourse = (event) => {
		const value = event.target.value;
		setCourse(value);
	};
	const changeStandard = (event) => {
		const value = event.target.value;
		setStandard(value);
	};
	useEffect(
		() => {
			dispatch(getstudent(props.admin.adminDetails.userid));
		},
		[ props.admin.adminDetails.userid ]
	);

	const student = props.admin.studentloading ? (
		<p>Loading...</p>
	) : (
		props.admin.student
			.filter((student) => {
				return student.course === course && student.class === standard.toString();
			})
			.map((stud, index) => {
				return (
					<div className="student-info" key={index}>
						<span className="student-index">{index + 1}</span>
						<span className="student-name">{stud.username}</span>
						<span className="student-class">{stud.class}</span>
						<span className="student-course">{stud.course}</span>
						<button className="unenroll-btn">Remove student</button>
					</div>
				);
			})
	);

	return (
		<div className="StudentView">
			<p className="student-title">Enrolled Students</p>
			<div className="filter-area">
				<button
					className={standard === '11' ? 'active-student-tab' : 'tab'}
					onClick={changeStandard}
					value="11"
				>
					Class 11 Students
				</button>
				<button
					className={standard === '12' ? 'active-student-tab' : 'tab'}
					onClick={changeStandard}
					value="12"
				>
					Class 12 Students
				</button>
				<button
					className={standard === '13' ? 'active-student-tab' : 'tab'}
					onClick={changeStandard}
					value="13"
				>
					PassOut Students
				</button>
				<select className="course-option" name="course" onChange={changeCourse} value={course}>
					<option className="option-dropdown" value="jee">
						JEE Students
					</option>
					<option className="option-dropdown" value="neet">
						NEET Students
					</option>
				</select>
			</div>
			<div className="student-info">
				<span>No.</span>
				<span>Name</span>
				<span>Class</span>
				<span>Course</span>
				<span>Unenroll student</span>
			</div>
			{student}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		admin: state.admin
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
