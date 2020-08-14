import React from 'react';

export const CoachingExam = (props) => {
	return (
		<div>
			<h1>{props.examname}</h1>
			<h1>{props.course}</h1>
			<button>EDIT</button>
		</div>
	);
};
