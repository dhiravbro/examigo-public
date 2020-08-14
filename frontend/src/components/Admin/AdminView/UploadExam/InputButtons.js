import React from 'react';
import { connect } from 'react-redux';

const InputButtons = (props) => {
	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return (
		<div>
			{capitalize(props.label)} :
			<button name={props.label} value="text" onClick={props.inputTypeHandler}>
				Upload Text
			</button>
			<button name={props.label} value="file" onClick={props.inputTypeHandler}>
				Upload Image
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputButtons);
