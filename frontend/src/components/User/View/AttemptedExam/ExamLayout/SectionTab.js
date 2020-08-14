import React from 'react';
import { connect } from 'react-redux';
import './SectionTab.css';

export const SectionTab = (props) => {
	return (
		<div className="SectionTabs">
			{props.sec.map((section, index) => {
				return (
					<div key={index} className="SectionTab" onClick={() => props.changeSec(index)}>
						{section.secname}
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = (state) => ({
	// section: state.user.attemptexam.sec
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SectionTab);
