import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar/Sidebar';
import View from '../View/View';
import './Layout.css';
import ExamLayout from '../View/AttemptedExam/ExamLayout/Layout';
const Layout = (props) => {
	const ScreenView = !props.user.attemptloading ? (
		<ExamLayout />
	) : (
		<div className="User-View">
			<Sidebar />

			<View />
		</div>
	);
	return <Fragment>{ScreenView}</Fragment>;
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
