import React, { useState, Fragment} from 'react';
import { connect } from 'react-redux';
import ExamView from './ExamView';
import './ExamLayout.css';
import { calculation } from '../../../../../redux/index';
import Timer from 'react-compound-timer';
import moment from 'moment';
import MyModal from '../../../../UI/Modal/Modal';
export const Layout = (props) => {
	const [ selSec, setSelSec ] = useState(0);

	const [ selQues, setSelQues ] = useState(0);

	const [ show, setShow ] = useState(true);

	const [ response, setResponse ] = useState([
		{
			questype: props.sec[0].typeofques,
			quesid: props.sec[0].question[0]._id,
			res: [],
			visited: 0
		}
	]);
	console.log(selSec, selQues);
	const editResponse = (res) => {
		const quesid = res.quesid;
		setResponse((prevArray) => {
			const newArray = prevArray.filter((element) => {
				return element.quesid !== quesid;
			});
			return [ ...newArray, res ];
		});
	};

	const clearResponse = (quesid) => {
		setResponse((prevArray) => {
			let newObj;
			prevArray.forEach((element) => {
				if (element.quesid === quesid) {
					newObj = { res: [], quesid: element.quesid, visited: element.visited, questype: element.questype };
				}
			});
			const newArray = prevArray.filter((element) => {
				return element.quesid !== quesid;
			});
			return [ ...newArray, newObj ];
		});
	};
	const getResponse = (quesid) => {
		const newArray = response.filter((element) => {
			return element.quesid !== quesid;
		});
		if (newArray.length !== response.length) {
			let resObj;
			response.forEach((element) => {
				if (element.quesid === quesid) {
					resObj = { res: element.res, questype: element.questype };
				}
			});

			return resObj;
		} else {
			return null;
		}
	};
	const changeSection = (index) => {
		setSelSec(index);
		changeQuestion(0);
	};

	const changeQuestion = (index) => {
		setSelQues(index);
	};

	const endExam = (ExamStatus) => {
		console.log('heeelloo');
		props.calculation(props.attemptexam._id, props.user.userid);
		setShow(false);
		setSubmitting(false);
	};

	let currentMoment = moment();
	let examStartMoment = moment(props.attemptexam.examdate);
	let duration;
	let examEndMoment = moment(props.attemptexam.examdate).add(props.duration, 's');
	if (moment(currentMoment).isBetween(examStartMoment, examEndMoment)) {
		duration = moment.duration(examEndMoment.diff(currentMoment)).asSeconds();
	}
	if (examEndMoment.isBefore(currentMoment)) {
		duration = props.duration;
	}

	const [ submitting, setSubmitting ] = useState(false);
	const cancelSubmit = () => {
		setSubmitting(false);
	};
	const startSubmit = () => {
		setSubmitting(true);
	};
	return (
		<Fragment>
			<Timer
				initialTime={duration * 1000}
				direction="backward"
				startImmediately={true}
				onStop={endExam}
				checkpoints={[
					{
						time: 0,
						callback: () => {
							endExam();
						}
					}
				]}
			>
				{({ stop }) => (
					<Fragment>
						<MyModal show={submitting} modalClosed={cancelSubmit}>
							<p>Are you sure you want to submit ?</p>
							<button
								onClick={() => {
									endExam();
									stop();
								}}
							>
								Yes
							</button>
							<button onClick={cancelSubmit}>No</button>
						</MyModal>
						<div className="exam-view">
							<div className="examname-div">
								{props.attemptexam.examname}
								<i class="fas fa-info-circle" />
							</div>
							<div className="timer-div">
								<Timer.Hours />hr
								<Timer.Minutes />min
								<Timer.Seconds />sec
							</div>
							<ExamView
								startSubmit={startSubmit}
								examOn={show}
								clearResponse={clearResponse}
								editResponse={editResponse}
								getResponse={getResponse}
								response={response}
								quesno={selQues}
								secno={selSec}
								changeQues={changeQuestion}
								changeSec={changeSection}
								type={props.sec[selSec].typeofques}
								section={props.sec[selSec]}
								sec={props.sec}
								ques={props.sec[selSec].question[selQues]}
							/>
						</div>
					</Fragment>
				)}
			</Timer>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	sec: state.user.attemptexam.sec,
	attemptexam: state.user.attemptexam,
	duration: state.user.attemptexam.duration,
	user: state.user.userDetails,
	loading: state.user.attemptloading
});

const mapDispatchToProps = (dispatch) => {
	return {
		calculation: function(examid, userid) {
			dispatch(calculation(examid, userid));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
