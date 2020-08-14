import React, { useEffect, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { dashboard } from '../../../../redux';
import AnalysisRadial from '../Analysis-Radial';

export const DashBoard = (props) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(dashboard(props.user.userid));
		},
		[ props.user.userid ]
	);

	const dashboardInfo = props.dashboardloading ? (
		<h2>Loading</h2>
	) : (
		<div className="Radialcard">
			<div>
				<AnalysisRadial details={props.dashboard.mathcount / props.dashboard.totalmath * 100} />
			</div>
			<div>
				<AnalysisRadial details={props.dashboard.chemcount / props.dashboard.totalchem * 100} />
			</div>
			<div>
				<AnalysisRadial details={props.dashboard.phycount / props.dashboard.totalphy * 100} />
			</div>
		</div>
	);
	return <Fragment>{dashboardInfo}</Fragment>;
};

const mapStateToProps = (state) => ({
	user: state.user.userDetails,
	dashboard: state.user.dashboard,
	dashboardloading: state.user.dashboardloading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
