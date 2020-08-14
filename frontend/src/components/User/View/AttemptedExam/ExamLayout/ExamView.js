import React, { Fragment } from 'react';
import SectionTab from './SectionTab';
import QuestionTab from './QuestionTab';
import QuestionView from '../ExamView/QuestionView';
export default function ExamView(props) {
	return (
		<Fragment>
			{props.examOn ? (
				<Fragment>
					<div className="section-tabs">
						<SectionTab changeSec={props.changeSec} sec={props.sec} />
					</div>
					<div className="question-tabs">
						<QuestionTab changeQues={props.changeQues} sec={props.section} />
					</div>
					<div className="question-view">
						<QuestionView
							clearResponse={props.clearResponse}
							editResponse={props.editResponse}
							getResponse={props.getResponse}
							response={props.response}
							quesno={props.quesno}
							secno={props.secno}
							changeQues={props.changeQues}
							changeSec={props.changeSec}
							type={props.type}
							section={props.section}
							sec={props.sec}
							ques={props.ques}
						/>
					</div>
					<button className="submit-button" onClick={() => props.startSubmit()}>
						Submit
					</button>
				</Fragment>
			) : (
				<div>Exam is Over</div>
			)}
		</Fragment>
	);
}
