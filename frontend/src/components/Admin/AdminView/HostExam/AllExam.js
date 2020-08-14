import React, { useEffect, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getallexams } from '../../../../redux';
import { Spinner } from 'reactstrap';
import './HostExam.css';
import HostExam from './HostExam';

const AllExam = (props) => {
	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(getallexams(props.admin.adminDetails.userid));
		},
		[ props.admin.adminDetails.userid ]
	);

	const exams = props.admin.allexamloading ? (
		<Spinner style={{ width: '3rem', height: '3rem' }} />
	) : (
		<div className="host-exam-view">
			<p className="host-exam-title">Host Exams</p>
			{props.admin.exam.map((exam, index) => <HostExam key={index} index={index} exam={exam} />)}
		</div>
	);

	return <Fragment>{exams}</Fragment>;
};
const mapStateToProps = (state) => ({
	admin: state.admin
});

export default connect(mapStateToProps)(AllExam);
