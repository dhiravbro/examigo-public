import React from 'react';
import { connect } from 'react-redux';
import './Feedback.css';
export const Feedback = () => {
	return (
		<div className="feedback-view">
			<p className="feedback-title">feedback</p>
			<textarea className="feedback-input" name="feedback" />
			<button className="feedback-btn">Submit</button>
		</div>
	);
};

const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//     sendfeedback:sendfeedback(feedback){
//         dispatch(sendfeedback)
//     }
// }

export default connect(mapStateToProps)(Feedback);
