import React, { useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hostexam, deleteExam } from '../../../../redux';
import './HostExam.css';
const HostExam = (props) => {
	const [ showHostBox, setHostBox ] = useState(false);
	const [ hostDetails, setHostDetails ] = useState({
		date: undefined,
		duration: ''
	});

	
	const style = showHostBox ? null : { display: 'none' };
	const onClickHandler = () => {
		setHostBox(!showHostBox);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setHostDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value
			};
		});
	};
	const setExamid = (examid) => {
		localStorage.setItem('examid', examid);
	};

	return (
		<div className="host-exam-div">
			<div className="host" onClick={onClickHandler}>
				<div>
					<p className="host-examname">{props.exam.examname}</p>
					<p className="host-description">{props.exam.description}</p>
				</div>

				<div>
					<p className="host-course">{props.exam.course.toUpperCase()}</p>
					<p className="host-class">{props.exam.class}</p>
				</div>
				<div className="host-exam-icon">
					<Link to="/secdetails">
						<i class="fas fa-pen" onClick={() => setExamid(props.exam._id)} />
					</Link>
					<p>Edit</p>
				</div>
				<div className="host-exam-icon">
					<i class="fas fa-trash-alt fa-sm " onClick={() => props.deleteExam(props.exam._id)} />
					<p>Delete</p>
				</div>
			</div>
			<div className="date-time-slider" style={style}>
				<input
					id={'dateField' + props.index}
					type="datetime-local"
					name="date"
					className="form-input"
					placeholder="Date"
					value={hostDetails.date}
					onChange={onChangeHandler}
					
				/>
				<input
					id="host-duration"
					className="form-input"
					type="number"
					name="duration"
					value={hostDetails.duration}
					onChange={onChangeHandler}
					placeholder="Enter Duration in Hours ..."
				/>
				<button
					className="host-exam-btn"
					onClick={() => props.hostexam(props.exam._id, hostDetails.date, hostDetails.duration)}
				>
					Host
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		hostexam: function(examid, date, duration) {
			dispatch(hostexam(examid, date, duration));
		},
		deleteExam: function(examid) {
			dispatch(deleteExam(examid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HostExam);
