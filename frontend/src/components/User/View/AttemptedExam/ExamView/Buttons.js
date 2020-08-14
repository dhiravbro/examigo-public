import React from 'react';
import { connect } from 'react-redux';
import './Buttons.css';
export const Buttons = (props) => {
	return (
		<div className="exam-buttons-div">
			<div>
				<button className="review-button" onClick={props.mark}>
					Mark for Review and Next
				</button>
				<button className="clear-button" onClick={props.clear}>
					Clear Response
				</button>
			</div>
			<button className="save-button" onClick={props.save}>
				Save and Next
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
