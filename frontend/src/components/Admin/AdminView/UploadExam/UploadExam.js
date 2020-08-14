import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploaddetail } from '../../../../redux';
import { Link } from 'react-router-dom';
import './UploadExam.css';
function UploadExam(props) {
	const [ examDetails, setExamDetails ] = useState({
		examname: '',
		course: 'jee',
		class: '11',
		description: ''
	});

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setExamDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value
			};
		});
	};
	const button = !props.exam._id ? (
		<button
			className="next-btn"
			variant="primary"
			disabled={!(examDetails.examname && examDetails.description)}
			onClick={() =>
				props.uploaddetail(
					examDetails.examname,
					examDetails.class,
					examDetails.course,
					examDetails.description
				)}
		>
			Next
		</button>
	) : (
		<Link className="add-sec" to="/secdetails">
			<button className="upload-btn">Continue</button>
		</Link>
	);
	return (
		<div className="upload-exam-view">
			<p className="upload-title">Upload Exam</p>
			<div className="upload-area">
				<div className="upload-select-box">
					<label for="course">Course</label>
					<select name="course" className="upload-select" onChange={changeHandler} value={examDetails.course}>
						<option value="jee">JEE</option>
						<option value="neet">NEET</option>
					</select>
				</div>
				<div className="upload-select-box">
					<label for="class">Class</label>
					<select name="class" className="upload-select" onChange={changeHandler} value={examDetails.class}>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">Passout</option>
					</select>
				</div>
				<div className="upload-box">
					<label for="examname">Exam Name : </label>
					<input
						className="form-input"
						onChange={changeHandler}
						type="text"
						name="examname"
						id="name"
						placeholder="Exam Name"
						value={examDetails.examname}
						required
					/>
				</div>
				<div className="upload-box">
					<label for="description">Description : </label>
					<input
						className="form-input"
						onChange={changeHandler}
						type="text"
						name="description"
						id="name"
						placeholder="Description"
						value={examDetails.description}
						required
					/>
				</div>
				{button}
			</div>
		</div>
	);
}

const mapStatetoProps = (state) => {
	return {
		exam: state.exam.examdetails,
		sec: state.exam.sec
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		uploaddetail: function(examname, classs, course, description) {
			dispatch(uploaddetail(examname, classs, course, description));
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(UploadExam);
