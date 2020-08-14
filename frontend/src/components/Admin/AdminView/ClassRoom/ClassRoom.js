import React, {  useState } from 'react';
import { connect } from 'react-redux';
import ChatRoom from '../../../ChatRoom/ChatRoom';
const ClassRoom = (props) => {
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
	return (
		<div>
			<h1>Class Room</h1>
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
			<ChatRoom
				coachingid={props.admin.userid}
				course={course}
				class={standard}
				avatar={'7'}
				username={props.admin.username}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	admin: state.admin.adminDetails
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassRoom);
