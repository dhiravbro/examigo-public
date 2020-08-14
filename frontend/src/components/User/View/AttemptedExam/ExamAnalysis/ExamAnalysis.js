import React from 'react';
import { connect } from 'react-redux';
import AnalysisPaper from '../../AnalysisPaper';
import StackedColumnChart from '../../StackedColumnChart';
import Physics from '../../../../../SubjectDetails/Physics';
import Chemistry from '../../../../../SubjectDetails/Chemistry';
import Maths from '../../../../../SubjectDetails/Math';

export const ExamAnalysis = (props) => {
	let analysisEXAM;

	const physics = { ...Physics };
	const chemistry = { ...Chemistry };
	const math = { ...Maths };
	let mathInPaper = false,
		physicsInPaper = false,
		chemistryInPaper = false;
	let phyTagName = [],
		phyCorrect = [],
		phyWrong = [],
		chemTagName = [],
		chemCorrect = [],
		chemWrong = [],
		mathTagName = [],
		mathCorrect = [],
		mathWrong = [];
	const Analysis = () => {
		const yourMarks = [];
		const avgMarks = [];
		const highMarks = [];
		const totalUser = props.examanalysis.phyuser + props.examanalysis.chemuser + props.examanalysis.mathuser;
		const totalAvg = props.examanalysis.phyavg + props.examanalysis.chemavg + props.examanalysis.mathavg;
		yourMarks.push(props.examanalysis.phyuser);
		yourMarks.push(props.examanalysis.chemuser);
		yourMarks.push(props.examanalysis.mathuser);
		yourMarks.push(totalUser);
		avgMarks.push(props.examanalysis.phyavg);
		avgMarks.push(props.examanalysis.chemavg);
		avgMarks.push(props.examanalysis.mathavg);
		avgMarks.push(totalAvg);
		highMarks.push(props.examanalysis.phyhigh);
		highMarks.push(props.examanalysis.chemhigh);
		highMarks.push(props.examanalysis.mathhigh);
		highMarks.push(props.examanalysis.totalhigh);
		props.examanalysis.usersheet[0].correcttags.forEach((tag) => {
			const TagName = tag.name;
			if (physics[TagName]) {
				physics[TagName].totalFreq += 1;
				physics[TagName].correctFreq += 1;
			}
			if (chemistry[TagName]) {
				chemistry[TagName].totalFreq += 1;
				chemistry[TagName].correctFreq += 1;
			}
			if (math[TagName]) {
				math[TagName].totalFreq += 1;
				math[TagName].correctFreq += 1;
			}
		});

		props.examanalysis.usersheet[0].wrongtags.forEach((tag) => {
			const TagName = tag.name;
			if (physics[TagName]) {
				physics[TagName].totalFreq += 1;
				physics[TagName].wrongFreq += 1;
			}
			if (chemistry[TagName]) {
				chemistry[TagName].totalFreq += 1;
				chemistry[TagName].wrongFreq += 1;
			}
			if (math[TagName]) {
				math[TagName].totalFreq += 1;
				math[TagName].wrongFreq += 1;
			}
		});
		Object.keys(physics).forEach((chapter) => {
			if (physics[chapter].totalFreq > 0) {
				phyTagName.push(chapter);
				phyCorrect.push(physics[chapter].correctFreq);
				phyWrong.push(physics[chapter].wrongFreq);
				physicsInPaper = true;
			}
		});
		Object.keys(chemistry).forEach((chapter) => {
			if (chemistry[chapter].totalFreq > 0) {
				chemTagName.push(chapter);
				chemCorrect.push(chemistry[chapter].correctFreq);
				chemWrong.push(chemistry[chapter].wrongFreq);
				chemistryInPaper = true;
			}
		});
		Object.keys(math).forEach((chapter) => {
			if (math[chapter].totalFreq > 0) {
				mathTagName.push(chapter);
				mathCorrect.push(math[chapter].correctFreq);
				mathWrong.push(math[chapter].wrongFreq);
				mathInPaper = true;
			}
		});
		let analysis = (
			<div>
				<AnalysisPaper user={yourMarks} avg={avgMarks} high={highMarks} />
				{physicsInPaper ? (
					<StackedColumnChart
						subjectName="Physics"
						tagName={phyTagName}
						correctAnswered={phyCorrect}
						wrongAnswered={phyWrong}
					/>
				) : null}
				{chemistryInPaper ? (
					<StackedColumnChart
						subjectName="Chemistry"
						tagName={chemTagName}
						correctAnswered={chemCorrect}
						wrongAnswered={chemWrong}
					/>
				) : null}
				{mathInPaper ? (
					<StackedColumnChart
						subjectName="Mathematics"
						tagName={mathTagName}
						correctAnswered={mathCorrect}
						wrongAnswered={mathWrong}
					/>
				) : null}
			</div>
		);
		return analysis;
	};
	console.log(physics);
	analysisEXAM = props.analysisloading ? <h2>Loading</h2> : <div>{Analysis()}</div>;
	return (
		<div>
			<div>{analysisEXAM}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user.userDetails,
		examanalysis: state.user.examanalysis,
		analysisloading: state.user.analysisloading
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExamAnalysis);
