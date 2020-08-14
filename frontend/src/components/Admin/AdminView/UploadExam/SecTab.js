import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deletesec } from '../../../../redux';
import './Sectab.css';
function SecTab(props) {
	return (
		<div className="sec-tab">
			<div className="sec-info">
				<p className="sec-name">{props.secname}</p>
				<p className="subject">{props.subject.toUpperCase()}</p>
			</div>
			<span className="question-type">{props.typeofques.toUpperCase()}</span>
			<span className="marking-scheme">
				+{props.positive}/-{props.negative}
			</span>
			<Link to={'/addques/' + props.section_id + '/' + props.typeofques + '/' + props.subject}>
				<button className="add-ques-btn">Add Question </button>
			</Link>
			<i
				class="fas fa-trash-alt fa-sm delete-sec"
				onClick={() => props.deletesec(localStorage.examid, props.section_id)}
			/>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deletesec: function(examid, secid) {
			dispatch(deletesec(examid, secid));
		}
	};
};

export default connect(null, mapDispatchToProps)(SecTab);
